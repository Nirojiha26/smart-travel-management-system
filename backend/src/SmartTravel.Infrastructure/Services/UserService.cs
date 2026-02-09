using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SmartTravel.Application.DTOs;
using SmartTravel.Application.Interfaces;
using SmartTravel.Domain.Entities;
using SmartTravel.Infrastructure.Persistence;

namespace SmartTravel.Infrastructure.Services;

public class UserService : IUserService
{
    private readonly IdentityContext _context;
    private readonly IConfiguration _configuration;
    private readonly PasswordHasher<User> _passwordHasher;
    private readonly IEmailService _emailService;

    public UserService(
        IdentityContext context, 
        IConfiguration configuration,
        IEmailService emailService)
    {
        _context = context;
        _configuration = configuration;
        _emailService = emailService;
        _passwordHasher = new PasswordHasher<User>();
    }

    public async Task<EmailVerificationResponseDto> SendVerificationCodeAsync(EmailVerificationRequestDto dto)
    {
        var code = new Random().Next(100000, 999999).ToString();

        var emailVerification = new EmailVerification
        {
            Email = dto.Email.ToLowerInvariant(),
            VerificationCode = code,
            ExpiresAt = DateTime.UtcNow.AddMinutes(15)
        };

        _context.EmailVerifications.Add(emailVerification);
        await _context.SaveChangesAsync();

        await _emailService.SendVerificationCodeAsync(dto.Email, code);

        return new EmailVerificationResponseDto
        {
            Success = true,
            Message = "Verification code sent to your email."
        };
    }

    public async Task<EmailVerificationResponseDto> VerifyEmailAsync(EmailVerificationConfirmDto dto)
    {
        var verification = await _context.EmailVerifications
            .Where(ev => ev.Email == dto.Email.ToLowerInvariant() && !ev.IsUsed)
            .FirstOrDefaultAsync();

        if (verification == null || verification.ExpiresAt <= DateTime.UtcNow)
        {
            return new EmailVerificationResponseDto
            {
                Success = false,
                Message = "Invalid or expired verification code."
            };
        }

        if (verification.VerificationCode != dto.Code)
        {
            return new EmailVerificationResponseDto
            {
                Success = false,
                Message = "Invalid verification code."
            };
        }

        verification.IsUsed = true;
        await _context.SaveChangesAsync();

        return new EmailVerificationResponseDto
        {
            Success = true,
            Message = "Email verified successfully."
        };
    }

    public async Task<UserDto> RegisterUserAsync(RegisterUserDto dto)
    {
        var verification = await _context.EmailVerifications
            .Where(ev => ev.Email == dto.Email.ToLowerInvariant() && ev.IsUsed)
            .FirstOrDefaultAsync();

        if (verification == null)
        {
            throw new Exception("Please verify your email first.");
        }

        if (await _context.Users.AnyAsync(u => u.Email == dto.Email.ToLowerInvariant()))
        {
            throw new Exception("This email is already registered.");
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            Name = dto.Name.Trim(),
            Email = dto.Email.ToLowerInvariant(),
            Role = Domain.Enums.Role.User,
            IsEmailVerified = true
        };

        user.PasswordHash = _passwordHasher.HashPassword(user, dto.Password);

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        var token = GenerateJwtToken(user);
        var userDto = MapToDto(user);
        userDto.Token = token;

        return userDto;
    }

    public async Task<UserDto> LoginUserAsync(LoginUserDto dto)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == dto.Email.ToLowerInvariant());

        if (user == null)
        {
            throw new Exception("Invalid email or password.");
        }

        var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);
        if (result == PasswordVerificationResult.Failed)
        {
            throw new Exception("Invalid email or password.");
        }

        var token = GenerateJwtToken(user);
        var userDto = MapToDto(user);
        userDto.Token = token;

        return userDto;
    }

    public async Task<UserDto> GetUserProfileAsync(Guid userId)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null)
        {
            throw new Exception("User not found.");
        }

        return MapToDto(user);
    }

    private string GenerateJwtToken(User user)
    {
        var jwtSettings = _configuration.GetSection("Jwt");
        var key = Encoding.ASCII.GetBytes(jwtSettings["Key"]!);

        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            }),
            Expires = DateTime.UtcNow.AddDays(double.Parse(jwtSettings["ExpireDays"]!)),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            Issuer = jwtSettings["Issuer"],
            Audience = jwtSettings["Audience"]
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    private static UserDto MapToDto(User user)
    {
        return new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            Role = user.Role,
            Budget = user.Budget,
            Interests = user.Interests
        };
    }
}

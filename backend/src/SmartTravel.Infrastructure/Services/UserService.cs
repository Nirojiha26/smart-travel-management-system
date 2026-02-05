using SmartTravel.Application.DTOs;
using SmartTravel.Application.Interfaces;
using SmartTravel.Domain.Entities;
using SmartTravel.Infrastructure.Persistence;

namespace SmartTravel.Infrastructure.Services;

public class UserService : IUserService
{
    private readonly IdentityContext _context;

    public UserService(IdentityContext context)
    {
        _context = context;
    }

    public async Task<UserDto> RegisterUserAsync(RegisterUserDto dto)
    {
        // 1. Check if user already exists in DB (EF Core)
        // 2. Hash password (using ASP.NET Core PasswordHasher or BCrypt)
        // 3. Create User entity with HashedPassword and Role
        // 4. Save to Database (EF Core)
        // 5. Return UserDto
        throw new NotImplementedException();
    }

    public async Task<UserDto> LoginUserAsync(LoginUserDto dto)
    {
        // 1. Find user by email (EF Core)
        // 2. Verify password hash
        // 3. Generate JWT Token (using SecretKey from AppSettings)
        // 4. Return UserDto with Token
        throw new NotImplementedException();
    }

    public async Task<UserDto> GetUserProfileAsync(Guid userId)
    {
        // 1. Fetch user from DB by ID
        // 2. Return mapped UserDto
        throw new NotImplementedException();
    }
}

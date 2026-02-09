using SmartTravel.Domain.Enums;

namespace SmartTravel.Application.DTOs;

public class UserDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public Role Role { get; set; }
    public decimal Budget { get; set; }
    public string[] Interests { get; set; } = Array.Empty<string>();
    public string? Token { get; set; }
}

public class RegisterUserDto
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class LoginUserDto
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class EmailVerificationRequestDto
{
    public string Email { get; set; } = string.Empty;
}

public class EmailVerificationConfirmDto
{
    public string Email { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
}

public class EmailVerificationResponseDto
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
}

public class ForgotPasswordRequestDto
{
    public string Email { get; set; } = string.Empty;
}

public class ResetPasswordRequestDto
{
    public string Email { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public string NewPassword { get; set; } = string.Empty;
}

public class ResetPasswordResponseDto
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
}

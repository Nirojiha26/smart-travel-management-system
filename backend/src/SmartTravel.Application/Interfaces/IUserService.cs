using SmartTravel.Application.DTOs;

namespace SmartTravel.Application.Interfaces;

public interface IUserService
{
    Task<UserDto> RegisterUserAsync(RegisterUserDto dto);
    Task<UserDto> LoginUserAsync(LoginUserDto dto);
    Task<UserDto> GetUserProfileAsync(Guid userId);
}

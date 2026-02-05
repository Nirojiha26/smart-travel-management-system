using SmartTravel.Application.DTOs;
using SmartTravel.Application.Interfaces;
using SmartTravel.Domain.Entities;

namespace SmartTravel.Infrastructure.Services;

public class UserService : IUserService
{
    public async Task<UserDto> RegisterUserAsync(RegisterUserDto dto)
    {
        // TODO: Implement registration logic
        throw new NotImplementedException();
    }

    public async Task<UserDto> LoginUserAsync(LoginUserDto dto)
    {
        // TODO: Implement login logic
        throw new NotImplementedException();
    }

    public async Task<UserDto> GetUserProfileAsync(Guid userId)
    {
        // TODO: Implement fetching user profile
        throw new NotImplementedException();
    }
}

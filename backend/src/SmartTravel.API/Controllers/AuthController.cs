using Microsoft.AspNetCore.Mvc;
using SmartTravel.Application.DTOs;
using SmartTravel.Application.Interfaces;

namespace SmartTravel.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;

    public AuthController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register([FromBody] RegisterUserDto dto)
    {
        // Placeholder
        return Ok(new UserDto());
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login([FromBody] LoginUserDto dto)
    {
        // Placeholder
        return Ok(new UserDto());
    }

    [HttpGet("profile")]
    public async Task<ActionResult<UserDto>> GetProfile()
    {
        // Placeholder
        return Ok(new UserDto());
    }
}

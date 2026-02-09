using SmartTravel.Domain.Enums;

namespace SmartTravel.Domain.Entities;

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public Role Role { get; set; } = Role.User;
    public decimal Budget { get; set; }
    public string[] Interests { get; set; } = Array.Empty<string>();
    public bool IsEmailVerified { get; set; } = false;
}

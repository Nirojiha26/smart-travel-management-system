using Microsoft.EntityFrameworkCore;
using SmartTravel.Domain.Entities;

namespace SmartTravel.Infrastructure.Persistence;

public class IdentityContext : DbContext
{
    public IdentityContext(DbContextOptions<IdentityContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
}

using Microsoft.EntityFrameworkCore;
using SmartTravel.Domain.Entities;

namespace SmartTravel.Infrastructure.Persistence;

public class IdentityContext : DbContext
{
    public IdentityContext(DbContextOptions<IdentityContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>()
            .Property(u => u.Budget)
            .HasPrecision(18, 2);
    }
}

using Microsoft.EntityFrameworkCore;
using SmartTravel.Domain.Entities;

namespace SmartTravel.Infrastructure.Persistence;

public class IdentityContext : DbContext
{
    public IdentityContext(DbContextOptions<IdentityContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<EmailVerification> EmailVerifications { get; set; }
    public DbSet<PasswordReset> PasswordResets { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>()
            .Property(u => u.Budget)
            .HasPrecision(18, 2);

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();
    }
}

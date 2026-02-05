using Microsoft.EntityFrameworkCore;
using SmartTravel.Application.Interfaces;
using SmartTravel.Infrastructure.Persistence;
using SmartTravel.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddOpenApi();

// Dependency Injection
builder.Services.AddDbContext<IdentityContext>(options =>
    options.UseInMemoryDatabase("SmartTravelDb")); // Placeholder for now

builder.Services.AddScoped<IUserService, UserService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();

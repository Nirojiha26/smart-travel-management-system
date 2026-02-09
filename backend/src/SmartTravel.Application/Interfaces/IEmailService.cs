namespace SmartTravel.Application.Interfaces;

public interface IEmailService
{
    Task SendVerificationCodeAsync(string email, string code);
}

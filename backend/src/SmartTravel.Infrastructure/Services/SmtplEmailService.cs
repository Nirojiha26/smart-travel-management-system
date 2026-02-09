using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using System.Net;
using System.Net.Mail;
using SmartTravel.Application.Interfaces;

namespace SmartTravel.Infrastructure.Services;

public class SmtplEmailService : IEmailService
{
    private readonly ILogger<SmtplEmailService> _logger;
    private readonly IConfiguration _configuration;
    private readonly string _host;
    private readonly int _port;
    private readonly string _username;
    private readonly string _password;
    private readonly bool _enableSsl;
    private readonly string _fromEmail;
    private readonly string _fromName;

    public SmtplEmailService(ILogger<SmtplEmailService> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
        
        _host = _configuration["Smtp:Host"] ?? throw new ArgumentNullException("SMTP Host not configured");
        _port = int.Parse(_configuration["Smtp:Port"] ?? "587");
        _username = _configuration["Smtp:Username"] ?? throw new ArgumentNullException("SMTP Username not configured");
        _password = _configuration["Smtp:Password"] ?? throw new ArgumentNullException("SMTP Password not configured");
        _enableSsl = bool.Parse(_configuration["Smtp:EnableSsl"] ?? "true");
        _fromEmail = _configuration["Smtp:FromEmail"] ?? throw new ArgumentNullException("SMTP FromEmail not configured");
        _fromName = _configuration["Smtp:FromName"] ?? "Smart Travel";
    }

    public async Task SendVerificationCodeAsync(string email, string code)
    {
        try
        {
            using var client = new SmtpClient(_host, _port)
            {
                Credentials = new NetworkCredential(_username, _password),
                EnableSsl = _enableSsl
            };

            var fromAddress = new MailAddress(_fromEmail, _fromName);
            var toAddress = new MailAddress(email);
            const string subject = "Smart Travel - Email Verification Code";
            
            var htmlBody = $@"
                <h2>Email Verification</h2>
                <p>Your verification code is: <strong>{code}</strong></p>
                <p>This code will expire in 15 minutes.</p>
                <p>If you didn't request this code, please ignore this email.</p>
                <hr>
                <p><small>© 2024 Smart Travel. All rights reserved.</small></p>";

            var textBody = $"Your verification code is: {code}. This code will expire in 15 minutes.";

            var mailMessage = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = htmlBody,
                IsBodyHtml = true
            };

            await client.SendMailAsync(mailMessage);
            _logger.LogInformation("Verification code sent via SMTP to {Email}", email);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending verification code via SMTP to {Email}", email);
            throw new Exception($"Failed to send verification email: {ex.Message}");
        }
    }
}

using System.ComponentModel.DataAnnotations;
using FixMyCampus.Domain.Enums;

namespace FixMyCampus.Application.DTOs.Auth;

public class RegisterRequest
{
  [Required, StringLength(100, MinimumLength = 2)]
  public string FullName { get; set; } = string.Empty;

  [Required, EmailAddress]
  public string Email { get; set; } = string.Empty;

  [Required, StringLength(100, MinimumLength = 6)]
  public string Password { get; set; } = string.Empty;

  public UserRole Role { get; set; } = UserRole.Reporter;
}
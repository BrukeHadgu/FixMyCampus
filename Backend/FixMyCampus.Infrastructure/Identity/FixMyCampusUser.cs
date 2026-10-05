using FixMyCampus.Domain.Enums;
using Microsoft.AspNetCore.Identity;
using FixMyCampus.Infrastructure.Identity;

namespace FixMyCampus.Infrastructure.Identity;

public class FixMyCampusUser : IdentityUser
{
  public string FullName { get; set; } = string.Empty;
  public UserRole Role { get; set; } = UserRole.Reporter;
  public bool IsActive { get; set; } = true;
  public bool MustChangePassword { get; set; }
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
  public int UserNumber { get; private set; }
  public string Code => Role switch
  {
    UserRole.Admin => $"ADM-{UserNumber:D4}",
    UserRole.Technician => $"TEC-{UserNumber:D4}",
    _ => $"REP-{UserNumber:D4}"
  };
}
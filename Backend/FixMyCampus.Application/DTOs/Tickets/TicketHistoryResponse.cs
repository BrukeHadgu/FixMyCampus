using FixMyCampus.Domain.Enums;

namespace FixMyCampus.Application.DTOs.Tickets;

public class TicketHistoryResponse
{
  public TicketStatus? FromStatus { get; set; }
  public TicketStatus ToStatus { get; set; }
  public string ChangedByName { get; set; } = string.Empty;
  public UserRole ChangedByRole { get; set; }
  public string? Note { get; set; }
  public DateTime CreatedAt { get; set; }
}
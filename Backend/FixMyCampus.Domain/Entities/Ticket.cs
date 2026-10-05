using FixMyCampus.Domain.Enums;

namespace FixMyCampus.Domain.Entities;

public class Ticket
{
  public int Id { get; set; }
  public int TicketNumber { get; set; }
  public string Code => $"FMC-{TicketNumber:D5}";
  public string ReporterId { get; set; } = string.Empty;
  public int CategoryId { get; set; }
  public Category Category { get; set; } = null!;
  public int BuildingId { get; set; }
  public Building Building { get; set; } = null!;
  public int RoomId { get; set; }
  public Room Room { get; set; } = null!;
  public string Description { get; set; } = string.Empty;
  public TicketPriority Priority { get; set; } = TicketPriority.Medium;
  public TicketStatus Status { get; set; } = TicketStatus.New;
  public string? TechnicianUserId { get; set; }
  public bool ReporterConfirmed { get; set; }
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
  public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
  public DateTime? ResolvedAt { get; set; }
  public List<TicketHistory> History { get; set; } = new();
}
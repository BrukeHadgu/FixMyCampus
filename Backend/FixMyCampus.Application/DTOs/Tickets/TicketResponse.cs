using FixMyCampus.Domain.Enums;

namespace FixMyCampus.Application.DTOs.Tickets;

public class TicketResponse
{
  public int Id { get; set; }
  public string Code { get; set; } = string.Empty;
  public int CategoryId { get; set; }
  public string CategoryName { get; set; } = string.Empty;
  public int BuildingId { get; set; }
  public string BuildingCode { get; set; } = string.Empty;
  public string BuildingName { get; set; } = string.Empty;
  public int RoomId { get; set; }
  public string RoomCode { get; set; } = string.Empty;
  public string Description { get; set; } = string.Empty;
  public TicketPriority Priority { get; set; }
  public TicketStatus Status { get; set; }
  public TicketStatus? NextStatus { get; set; }
  public string ReporterName { get; set; } = string.Empty;
  public string? TechnicianName { get; set; }
  public bool ReporterConfirmed { get; set; }
  public DateTime CreatedAt { get; set; }
  public DateTime UpdatedAt { get; set; }
  public List<TicketHistoryResponse> History { get; set; } = new();
}
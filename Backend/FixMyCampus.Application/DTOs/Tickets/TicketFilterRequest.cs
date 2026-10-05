using FixMyCampus.Domain.Enums;

namespace FixMyCampus.Application.DTOs.Tickets;

public class TicketFilterRequest
{
  public int? BuildingId { get; set; }
  public TicketStatus? Status { get; set; }
  public string? Search { get; set; }
  public bool OpenOnly { get; set; }
}
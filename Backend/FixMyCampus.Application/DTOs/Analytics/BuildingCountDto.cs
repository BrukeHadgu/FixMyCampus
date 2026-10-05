namespace FixMyCampus.Application.DTOs.Analytics;

public class BuildingCountDto
{
  public int BuildingId { get; set; }
  public string BuildingName { get; set; } = string.Empty;
  public string BuildingCode { get; set; } = string.Empty;
  public int OpenTicketCount { get; set; }
}
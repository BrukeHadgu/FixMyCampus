namespace FixMyCampus.Application.DTOs.Analytics;

public class AdminDashboardSummaryDto
{
  public int TotalOpenTickets { get; set; }
  public int NewCount { get; set; }
  public int AssignedCount { get; set; }
  public int InProgressCount { get; set; }
  public int ResolvedCount { get; set; }
  public List<BuildingCountDto> ByBuilding { get; set; } = new();
}
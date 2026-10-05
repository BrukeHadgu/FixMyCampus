using FixMyCampus.Application.DTOs.Analytics;
using FixMyCampus.Application.DTOs.Campus;

namespace FixMyCampus.Application.Services;

public interface ICampusService
{
  Task<List<BuildingDto>> GetBuildingsAsync();
  Task<List<RoomDto>> GetRoomsAsync(int? buildingId);
  Task<List<CategoryDto>> GetCategoriesAsync();
  Task<AdminDashboardSummaryDto> GetDashboardMetricsAsync();
}
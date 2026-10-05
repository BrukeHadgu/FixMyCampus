using FixMyCampus.Application.DTOs.Analytics;
using FixMyCampus.Application.DTOs.Campus;
using FixMyCampus.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FixMyCampus.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CampusController : ControllerBase
{
  private readonly ICampusService _campusService;

  public CampusController(ICampusService campusService)
  {
    _campusService = campusService;
  }

  [HttpGet("buildings")]
  public async Task<ActionResult<List<BuildingDto>>> GetBuildings()
  {
    var buildings = await _campusService.GetBuildingsAsync();
    return Ok(buildings);
  }

  [HttpGet("rooms")]
  public async Task<ActionResult<List<RoomDto>>> GetRooms(
      [FromQuery] int? buildingId)
  {
    var rooms = await _campusService.GetRoomsAsync(buildingId);
    return Ok(rooms);
  }

  [HttpGet("categories")]
  public async Task<ActionResult<List<CategoryDto>>> GetCategories()
  {
    var categories = await _campusService.GetCategoriesAsync();
    return Ok(categories);
  }

  [Authorize(Roles = "Admin")]
  [HttpGet("dashboard-summary")]
  public async Task<ActionResult<AdminDashboardSummaryDto>> GetDashboardSummary()
  {
    var summary = await _campusService.GetDashboardMetricsAsync();
    return Ok(summary);
  }
}
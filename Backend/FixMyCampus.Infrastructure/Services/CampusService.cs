using FixMyCampus.Application.DTOs.Analytics;
using FixMyCampus.Application.DTOs.Campus;
using FixMyCampus.Application.DTOs.Tickets;
using FixMyCampus.Application.Interfaces.Repositories;
using FixMyCampus.Application.Services;
using FixMyCampus.Domain.Enums;

namespace FixMyCampus.Infrastructure.Services;

public class CampusService : ICampusService
{
  private readonly IBuildingRepository _buildingRepo;
  private readonly IRoomRepository _roomRepo;
  private readonly ICategoryRepository _categoryRepo;
  private readonly ITicketRepository _ticketRepo;

  public CampusService(
      IBuildingRepository buildingRepo,
      IRoomRepository roomRepo,
      ICategoryRepository categoryRepo,
      ITicketRepository ticketRepo)
  {
    _buildingRepo = buildingRepo;
    _roomRepo = roomRepo;
    _categoryRepo = categoryRepo;
    _ticketRepo = ticketRepo;
  }

  public async Task<List<BuildingDto>> GetBuildingsAsync()
  {
    var buildings = await _buildingRepo.GetAllAsync();
    return buildings.Select(b => new BuildingDto { Id = b.Id, Code = b.Code, Name = b.Name }).ToList();
  }

  public async Task<List<RoomDto>> GetRoomsAsync(int? buildingId)
  {
    var rooms = await _roomRepo.GetByBuildingAsync(buildingId);
    return rooms.Select(r => new RoomDto
    {
      Id = r.Id,
      BuildingId = r.BuildingId,
      BuildingCode = r.Building.Code,
      Number = r.Number,
      Code = r.Code
    }).ToList();
  }

  public async Task<List<CategoryDto>> GetCategoriesAsync()
  {
    var categories = await _categoryRepo.GetAllAsync();
    return categories.Select(c => new CategoryDto
    {
      Id = c.Id,
      Name = c.Name,
      DefaultPriority = c.DefaultPriority.ToString()
    }).ToList();
  }

  public async Task<AdminDashboardSummaryDto> GetDashboardMetricsAsync()
  {
    var allTickets = await _ticketRepo.GetFilteredAsync(new TicketFilterRequest());
    var buildings = await _buildingRepo.GetAllAsync();

    var openTickets = allTickets.Where(t => t.Status != TicketStatus.Resolved).ToList();

    return new AdminDashboardSummaryDto
    {
      TotalOpenTickets = openTickets.Count,
      NewCount = allTickets.Count(t => t.Status == TicketStatus.New),
      AssignedCount = allTickets.Count(t => t.Status == TicketStatus.Assigned),
      InProgressCount = allTickets.Count(t => t.Status == TicketStatus.InProgress),
      ResolvedCount = allTickets.Count(t => t.Status == TicketStatus.Resolved),
      ByBuilding = buildings.Select(b => new BuildingCountDto
      {
        BuildingId = b.Id,
        BuildingCode = b.Code,
        BuildingName = b.Name,
        OpenTicketCount = openTickets.Count(t => t.BuildingId == b.Id)
      }).ToList()
    };
  }
}
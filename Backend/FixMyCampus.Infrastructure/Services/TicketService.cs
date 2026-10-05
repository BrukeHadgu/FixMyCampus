using FixMyCampus.Application.Common;
using FixMyCampus.Application.DTOs.Tickets;
using FixMyCampus.Application.Interfaces.Repositories;
using FixMyCampus.Application.Services;
using FixMyCampus.Domain.Entities;
using FixMyCampus.Domain.Enums;

namespace FixMyCampus.Infrastructure.Services;

public class TicketService : ITicketService
{
  private readonly ITicketRepository _ticketRepo;
  private readonly IRoomRepository _roomRepo;
  private readonly ICategoryRepository _categoryRepo;

  public TicketService(
      ITicketRepository ticketRepo,
      IRoomRepository roomRepo,
      ICategoryRepository categoryRepo)
  {
    _ticketRepo = ticketRepo;
    _roomRepo = roomRepo;
    _categoryRepo = categoryRepo;
  }

  public async Task<TicketResponse> CreateAsync(CreateTicketRequest request, string reporterId, string reporterName)
  {
    var room = await _roomRepo.GetByIdAsync(request.RoomId)
               ?? throw new InvalidOperationException("Specified room not found.");
    var category = await _categoryRepo.GetByIdAsync(request.CategoryId)
                   ?? throw new InvalidOperationException("Specified category not found.");

    var ticket = new Ticket
    {
      ReporterId = reporterId,
      ReporterName = reporterName,
      CategoryId = category.Id,
      RoomId = room.Id,
      BuildingId = room.BuildingId,
      Description = request.Description.Trim(),
      Priority = request.Priority ?? category.DefaultPriority,
      Status = TicketStatus.New,
      CreatedAt = DateTime.UtcNow,
      UpdatedAt = DateTime.UtcNow
    };

    ticket.History.Add(new TicketHistory
    {
      FromStatus = null,
      ToStatus = TicketStatus.New,
      ChangedById = reporterId,
      ChangedByName = reporterName,
      ChangedByRole = UserRole.Reporter,
      Note = "Ticket reported",
      CreatedAt = DateTime.UtcNow
    });

    await _ticketRepo.AddAsync(ticket);
    await _ticketRepo.SaveChangesAsync();

    return (await _ticketRepo.GetByIdAsync(ticket.Id))!.ToResponse();
  }

  public async Task<List<TicketResponse>> GetFeedAsync(TicketFilterRequest filter)
  {
    var tickets = await _ticketRepo.GetFilteredAsync(filter);
    return tickets.Select(t => t.ToResponse()).ToList();
  }

  public async Task<List<TicketResponse>> GetMyTicketsAsync(string reporterId)
  {
    var tickets = await _ticketRepo.GetFilteredAsync(new TicketFilterRequest(), reporterId);
    return tickets.Select(t => t.ToResponse()).ToList();
  }

  public async Task<TicketResponse> GetByCodeAsync(string code)
  {
    var ticket = await _ticketRepo.GetByCodeAsync(code)
                 ?? throw new KeyNotFoundException($"Ticket '{code}' not found.");
    return ticket.ToResponse();
  }

  public async Task<TicketResponse> AssignTechnicianAsync(string code, AssignTicketRequest request, string adminId, string adminName)
  {
    var ticket = await _ticketRepo.GetByCodeAsync(code)
                 ?? throw new KeyNotFoundException($"Ticket '{code}' not found.");

    TicketWorkflow.EnsureCanAssign(ticket.Status);

    ticket.TechnicianName = request.TechnicianName.Trim();
    ticket.Status = TicketStatus.Assigned;
    ticket.UpdatedAt = DateTime.UtcNow;

    ticket.History.Add(new TicketHistory
    {
      TicketId = ticket.Id,
      FromStatus = TicketStatus.New,
      ToStatus = TicketStatus.Assigned,
      ChangedById = adminId,
      ChangedByName = adminName,
      ChangedByRole = UserRole.Admin,
      Note = $"Assigned to {ticket.TechnicianName}",
      CreatedAt = DateTime.UtcNow
    });

    await _ticketRepo.SaveChangesAsync();
    return ticket.ToResponse();
  }

  public async Task<TicketResponse> MoveStatusAsync(string code, UpdateTicketStatusRequest request, string userId, string userName, UserRole role)
  {
    var ticket = await _ticketRepo.GetByCodeAsync(code)
                 ?? throw new KeyNotFoundException($"Ticket '{code}' not found.");

    TicketWorkflow.EnsureCanMove(ticket.Status, request.Status);

    var prev = ticket.Status;
    ticket.Status = request.Status;
    ticket.UpdatedAt = DateTime.UtcNow;

    if (request.Status == TicketStatus.Resolved)
      ticket.ResolvedAt = DateTime.UtcNow;

    ticket.History.Add(new TicketHistory
    {
      TicketId = ticket.Id,
      FromStatus = prev,
      ToStatus = request.Status,
      ChangedById = userId,
      ChangedByName = userName,
      ChangedByRole = role,
      CreatedAt = DateTime.UtcNow
    });

    await _ticketRepo.SaveChangesAsync();
    return ticket.ToResponse();
  }

  public async Task<TicketResponse> ConfirmResolvedAsync(string code, string reporterId)
  {
    var ticket = await _ticketRepo.GetByCodeAsync(code)
                 ?? throw new KeyNotFoundException($"Ticket '{code}' not found.");

    if (ticket.ReporterId != reporterId)
      throw new UnauthorizedAccessException("Only the original reporter can confirm this ticket is resolved.");

    TicketWorkflow.EnsureCanConfirmFixed(ticket.Status);

    ticket.ReporterConfirmed = true;
    ticket.UpdatedAt = DateTime.UtcNow;

    ticket.History.Add(new TicketHistory
    {
      TicketId = ticket.Id,
      FromStatus = ticket.Status,
      ToStatus = ticket.Status,
      ChangedById = reporterId,
      ChangedByName = ticket.ReporterName,
      ChangedByRole = UserRole.Reporter,
      Note = "Reporter confirmed fix",
      CreatedAt = DateTime.UtcNow
    });

    await _ticketRepo.SaveChangesAsync();
    return ticket.ToResponse();
  }
}
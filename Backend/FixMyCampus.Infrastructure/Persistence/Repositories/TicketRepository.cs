using FixMyCampus.Application.DTOs.Tickets;
using FixMyCampus.Application.Interfaces.Repositories;
using FixMyCampus.Domain.Entities;
using FixMyCampus.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace FixMyCampus.Infrastructure.Persistence.Repositories;

public class TicketRepository : ITicketRepository
{
  private readonly FixMyCampusDbContext _context;

  public TicketRepository(FixMyCampusDbContext context)
  {
    _context = context;
  }

  public Task<Ticket?> GetByIdAsync(int id, CancellationToken ct = default) =>
      _context.Tickets
          .Include(t => t.Building)
          .Include(t => t.Room)
          .Include(t => t.Category)
          .Include(t => t.History.OrderBy(h => h.CreatedAt))
          .FirstOrDefaultAsync(t => t.Id == id, ct);

  public Task<Ticket?> GetByCodeAsync(string code, CancellationToken ct = default)
  {
    var rawNumberStr = code.Trim().ToUpperInvariant().Replace("FMC-", "");
    if (!int.TryParse(rawNumberStr, out int ticketNumber))
      return Task.FromResult<Ticket?>(null);

    return _context.Tickets
        .Include(t => t.Building)
        .Include(t => t.Room)
        .Include(t => t.Category)
        .Include(t => t.History.OrderBy(h => h.CreatedAt))
        .FirstOrDefaultAsync(t => t.TicketNumber == ticketNumber, ct);
  }

  public Task<List<Ticket>> GetFilteredAsync(TicketFilterRequest filter, string? reporterId = null, CancellationToken ct = default)
  {
    var query = _context.Tickets
        .Include(t => t.Building)
        .Include(t => t.Room)
        .Include(t => t.Category)
        .AsNoTracking();

    if (!string.IsNullOrEmpty(reporterId))
      query = query.Where(t => t.ReporterId == reporterId);

    if (filter.BuildingId.HasValue)
      query = query.Where(t => t.BuildingId == filter.BuildingId.Value);

    if (filter.Status.HasValue)
      query = query.Where(t => t.Status == filter.Status.Value);

    if (filter.OpenOnly)
      query = query.Where(t => t.Status != TicketStatus.Resolved);

    if (!string.IsNullOrWhiteSpace(filter.Search))
    {
      var s = filter.Search.Trim().ToLower();
      query = query.Where(t => t.Description.ToLower().Contains(s) ||
                               t.Room.Number.ToLower().Contains(s) ||
                               t.Building.Name.ToLower().Contains(s));
    }

    return query.OrderByDescending(t => t.CreatedAt).ToListAsync(ct);
  }

  public async Task AddAsync(Ticket ticket, CancellationToken ct = default) =>
      await _context.Tickets.AddAsync(ticket, ct);

  public Task SaveChangesAsync(CancellationToken ct = default) =>
      _context.SaveChangesAsync(ct);
}
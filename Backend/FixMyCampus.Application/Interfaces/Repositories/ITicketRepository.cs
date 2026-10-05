using FixMyCampus.Application.DTOs.Tickets;
using FixMyCampus.Domain.Entities;

namespace FixMyCampus.Application.Interfaces.Repositories;

public interface ITicketRepository
{
  Task<Ticket?> GetByIdAsync(int id, CancellationToken ct = default);
  Task<Ticket?> GetByCodeAsync(string code, CancellationToken ct = default);
  Task<List<Ticket>> GetFilteredAsync(TicketFilterRequest filter, string? reporterId = null, CancellationToken ct = default);
  Task AddAsync(Ticket ticket, CancellationToken ct = default);
  Task SaveChangesAsync(CancellationToken ct = default);
}
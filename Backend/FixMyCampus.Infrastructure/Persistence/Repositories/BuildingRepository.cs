using FixMyCampus.Application.Interfaces.Repositories;
using FixMyCampus.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FixMyCampus.Infrastructure.Persistence.Repositories;

public class BuildingRepository : IBuildingRepository
{
  private readonly FixMyCampusDbContext _context;

  public BuildingRepository(FixMyCampusDbContext context)
  {
    _context = context;
  }

  public Task<List<Building>> GetAllAsync(CancellationToken ct = default) =>
      _context.Buildings.AsNoTracking().OrderBy(b => b.Name).ToListAsync(ct);

  public Task<Building?> GetByIdAsync(int id, CancellationToken ct = default) =>
      _context.Buildings.Include(b => b.Rooms).FirstOrDefaultAsync(b => b.Id == id, ct);

  public Task<Building?> GetByCodeAsync(string code, CancellationToken ct = default) =>
      _context.Buildings.FirstOrDefaultAsync(b => b.Code.ToUpper() == code.Trim().ToUpper(), ct);

  public async Task AddAsync(Building building, CancellationToken ct = default) =>
      await _context.Buildings.AddAsync(building, ct);
}
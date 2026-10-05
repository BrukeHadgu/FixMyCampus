using FixMyCampus.Domain.Entities;

namespace FixMyCampus.Application.Interfaces.Repositories;

public interface IBuildingRepository
{
  Task<List<Building>> GetAllAsync(CancellationToken ct = default);
  Task<Building?> GetByIdAsync(int id, CancellationToken ct = default);
  Task<Building?> GetByCodeAsync(string code, CancellationToken ct = default);
  Task AddAsync(Building building, CancellationToken ct = default);
}
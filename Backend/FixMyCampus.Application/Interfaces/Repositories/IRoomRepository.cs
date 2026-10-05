using FixMyCampus.Domain.Entities;

namespace FixMyCampus.Application.Interfaces.Repositories;

public interface IRoomRepository
{
  Task<List<Room>> GetByBuildingAsync(int? buildingId, CancellationToken ct = default);
  Task<Room?> GetByIdAsync(int id, CancellationToken ct = default);
  Task<Room?> GetByCodeAsync(string code, CancellationToken ct = default);
  Task AddAsync(Room room, CancellationToken ct = default);
}
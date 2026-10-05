using FixMyCampus.Domain.Entities;

namespace FixMyCampus.Application.Interfaces.Repositories;

public interface ICategoryRepository
{
  Task<List<Category>> GetAllAsync(CancellationToken ct = default);
  Task<Category?> GetByIdAsync(int id, CancellationToken ct = default);
  Task AddAsync(Category category, CancellationToken ct = default);
}
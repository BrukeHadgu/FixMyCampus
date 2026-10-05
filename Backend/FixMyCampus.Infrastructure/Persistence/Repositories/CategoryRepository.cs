using FixMyCampus.Application.Interfaces.Repositories;
using FixMyCampus.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FixMyCampus.Infrastructure.Persistence.Repositories;

public class CategoryRepository : ICategoryRepository
{
  private readonly FixMyCampusDbContext _context;

  public CategoryRepository(FixMyCampusDbContext context)
  {
    _context = context;
  }

  public Task<List<Category>> GetAllAsync(CancellationToken ct = default) =>
      _context.Categories.AsNoTracking().OrderBy(c => c.Name).ToListAsync(ct);

  public Task<Category?> GetByIdAsync(int id, CancellationToken ct = default) =>
      _context.Categories.FindAsync([id], ct).AsTask();

  public async Task AddAsync(Category category, CancellationToken ct = default) =>
      await _context.Categories.AddAsync(category, ct);
}
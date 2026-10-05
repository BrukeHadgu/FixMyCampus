using System.Reflection;
using Microsoft.EntityFrameworkCore;
using FixMyCampus.Domain.Entities;
using FixMyCampus.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
namespace FixMyCampus.Infrastructure.Persistence;

public class FixMyCampusDbContext : IdentityDbContext<FixMyCampusUser>
{
  public FixMyCampusDbContext(DbContextOptions<FixMyCampusDbContext> options) : base(options) { }

  public DbSet<Building> Buildings => Set<Building>();
  public DbSet<Room> Rooms => Set<Room>();
  public DbSet<Category> Categories => Set<Category>();
  public DbSet<Ticket> Tickets => Set<Ticket>();
  public DbSet<TicketHistory> TicketHistories => Set<TicketHistory>();

  protected override void OnModelCreating(ModelBuilder builder)
  {
    base.OnModelCreating(builder);

    // Sequence for ticket codes (starts at 1001, e.g. FMC-01001)
    builder.HasSequence<int>("TicketNumberSeq")
        .StartsAt(1001)
        .IncrementsBy(1);

    // Automatically applies BuildingConfiguration, RoomConfiguration, TicketConfiguration, etc.
    builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
  }
}
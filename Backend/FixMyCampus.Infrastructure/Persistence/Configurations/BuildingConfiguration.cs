using FixMyCampus.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FixMyCampus.Infrastructure.Persistence.Configurations;

public class BuildingConfiguration : IEntityTypeConfiguration<Building>
{
  public void Configure(EntityTypeBuilder<Building> builder)
  {
    builder.ToTable("Buildings");

    builder.HasKey(b => b.Id);

    builder.Property(b => b.Code)
        .IsRequired()
        .HasMaxLength(20);

    builder.HasIndex(b => b.Code)
        .IsUnique();

    builder.Property(b => b.Name)
        .IsRequired()
        .HasMaxLength(100);

    builder.HasMany(b => b.Rooms)
        .WithOne(r => r.Building)
        .HasForeignKey(r => r.BuildingId)
        .OnDelete(DeleteBehavior.Cascade);
  }
}
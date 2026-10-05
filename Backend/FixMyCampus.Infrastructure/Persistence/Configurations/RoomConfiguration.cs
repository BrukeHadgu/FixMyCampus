using FixMyCampus.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FixMyCampus.Infrastructure.Persistence.Configurations;

public class RoomConfiguration : IEntityTypeConfiguration<Room>
{
  public void Configure(EntityTypeBuilder<Room> builder)
  {
    builder.ToTable("Rooms");

    builder.HasKey(r => r.Id);

    builder.Property(r => r.Number)
        .IsRequired()
        .HasMaxLength(30);

    builder.Property(r => r.Code)
        .IsRequired()
        .HasMaxLength(60);

    builder.HasIndex(r => r.Code)
        .IsUnique();

    builder.Property(r => r.IsActive)
        .IsRequired()
        .HasDefaultValue(true);
  }
}
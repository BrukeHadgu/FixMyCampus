using FixMyCampus.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FixMyCampus.Infrastructure.Persistence.Configurations;

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
  public void Configure(EntityTypeBuilder<Category> builder)
  {
    builder.ToTable("Categories");

    builder.HasKey(c => c.Id);

    builder.Property(c => c.Name)
        .IsRequired()
        .HasMaxLength(60);

    builder.Property(c => c.DefaultPriority)
        .IsRequired()
        .HasConversion<string>()
        .HasMaxLength(20);
  }
}
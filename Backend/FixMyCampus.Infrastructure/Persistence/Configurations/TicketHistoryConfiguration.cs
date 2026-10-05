using FixMyCampus.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FixMyCampus.Infrastructure.Persistence.Configurations;

public class TicketHistoryConfiguration : IEntityTypeConfiguration<TicketHistory>
{
    public void Configure(EntityTypeBuilder<TicketHistory> builder)
    {
        builder.ToTable("TicketHistories");

        builder.HasKey(h => h.Id);

        builder.Property(h => h.FromStatus)
            .HasConversion<string>()
            .HasMaxLength(30);

        builder.Property(h => h.ToStatus)
            .IsRequired()
            .HasConversion<string>()
            .HasMaxLength(30);

        builder.Property(h => h.ChangedById).IsRequired().HasMaxLength(450);
        builder.Property(h => h.ChangedByName).IsRequired().HasMaxLength(100);

        builder.Property(h => h.ChangedByRole)
            .IsRequired()
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.Property(h => h.Note).HasMaxLength(250);
        builder.Property(h => h.CreatedAt).IsRequired();
    }
}
using FixMyCampus.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FixMyCampus.Infrastructure.Persistence.Configurations;

public class TicketConfiguration : IEntityTypeConfiguration<Ticket>
{
    public void Configure(EntityTypeBuilder<Ticket> builder)
    {
        builder.ToTable("Tickets");

        builder.HasKey(t => t.Id);

        builder.Property(t => t.TicketNumber)
            .ValueGeneratedOnAdd()
            .HasDefaultValueSql("nextval('\"TicketNumberSeq\"'::regclass)");

        builder.HasIndex(t => t.TicketNumber).IsUnique();

        builder.Ignore(t => t.Code);

        builder.Property(t => t.ReporterId).IsRequired().HasMaxLength(450);
        builder.Property(t => t.ReporterName).IsRequired().HasMaxLength(100);
        builder.Property(t => t.Description).IsRequired().HasMaxLength(1000);

        builder.Property(t => t.Priority)
            .IsRequired()
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.Property(t => t.Status)
            .IsRequired()
            .HasConversion<string>()
            .HasMaxLength(30);

        builder.Property(t => t.TechnicianName).HasMaxLength(100);
        builder.Property(t => t.ReporterConfirmed).IsRequired().HasDefaultValue(false);

        builder.HasOne(t => t.Building)
            .WithMany()
            .HasForeignKey(t => t.BuildingId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(t => t.Room)
            .WithMany()
            .HasForeignKey(t => t.RoomId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(t => t.Category)
            .WithMany()
            .HasForeignKey(t => t.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(t => t.History)
            .WithOne(h => h.Ticket)
            .HasForeignKey(h => h.TicketId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
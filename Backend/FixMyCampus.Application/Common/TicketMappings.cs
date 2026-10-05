using FixMyCampus.Application.DTOs.Tickets;
using FixMyCampus.Domain.Entities;

namespace FixMyCampus.Application.Common;

public static class TicketMappings
{
  public static TicketResponse ToResponse(this Ticket ticket)
  {
    return new TicketResponse
    {
      Id = ticket.Id,
      Code = ticket.Code,
      CategoryId = ticket.CategoryId,
      CategoryName = ticket.Category?.Name ?? string.Empty,
      BuildingId = ticket.BuildingId,
      BuildingCode = ticket.Building?.Code ?? string.Empty,
      BuildingName = ticket.Building?.Name ?? string.Empty,
      RoomId = ticket.RoomId,
      RoomCode = ticket.Room?.Code ?? string.Empty,
      Description = ticket.Description,
      Priority = ticket.Priority,
      Status = ticket.Status,
      NextStatus = TicketWorkflow.NextStatus(ticket.Status),
      ReporterName = ticket.ReporterName,
      TechnicianName = ticket.TechnicianName,
      ReporterConfirmed = ticket.ReporterConfirmed,
      CreatedAt = ticket.CreatedAt,
      UpdatedAt = ticket.UpdatedAt,

      History = ticket.History
            .OrderBy(h => h.CreatedAt)
            .Select(h => new TicketHistoryResponse
            {
              FromStatus = h.FromStatus,
              ToStatus = h.ToStatus,
              ChangedByName = h.ChangedByName,
              ChangedByRole = h.ChangedByRole,
              Note = h.Note,
              CreatedAt = h.CreatedAt
            })
            .ToList()
    };
  }
}
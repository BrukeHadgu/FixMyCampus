using System.ComponentModel.DataAnnotations;
using FixMyCampus.Domain.Enums;

namespace FixMyCampus.Application.DTOs.Tickets;

public class UpdateTicketStatusRequest
{
  [Required]
  public TicketStatus Status { get; set; }
}
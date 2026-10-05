using System.ComponentModel.DataAnnotations;
using FixMyCampus.Domain.Enums;

namespace FixMyCampus.Application.DTOs.Tickets;

public class CreateTicketRequest
{
  [Range(1, int.MaxValue, ErrorMessage = "Category is required.")]
  public int CategoryId { get; set; }

  [Range(1, int.MaxValue, ErrorMessage = "Room is required.")]
  public int RoomId { get; set; }

  [Required, StringLength(1000, MinimumLength = 5)]
  public string Description { get; set; } = string.Empty;

  public TicketPriority? Priority { get; set; }
}
using System.ComponentModel.DataAnnotations;

namespace FixMyCampus.Application.DTOs.Tickets;

public class AssignTicketRequest
{
  [Required, StringLength(100, MinimumLength = 2)]
  public string TechnicianName { get; set; } = string.Empty;
}
using System.Security.Claims;
using FixMyCampus.Application.DTOs.Tickets;
using FixMyCampus.Application.Services;
using FixMyCampus.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FixMyCampus.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class TicketsController : ControllerBase
{
  private readonly ITicketService _ticketService;

  public TicketsController(ITicketService ticketService)
  {
    _ticketService = ticketService;
  }

  private string CurrentUserId =>
      User.FindFirstValue(ClaimTypes.NameIdentifier)
      ?? throw new UnauthorizedAccessException("User ID is missing.");

  private string CurrentUserName =>
      User.FindFirstValue(ClaimTypes.Name) ?? "Unknown User";

  private UserRole CurrentUserRole =>
      Enum.TryParse<UserRole>(
          User.FindFirstValue(ClaimTypes.Role),
          out var role)
              ? role
              : UserRole.Reporter;

  [HttpPost]
  public async Task<ActionResult<TicketResponse>> Create(
      [FromBody] CreateTicketRequest request)
  {
    var result = await _ticketService.CreateAsync(
        request,
        CurrentUserId,
        CurrentUserName);

    return CreatedAtAction(
        nameof(GetByCode),
        new { code = result.Code },
        result);
  }

  [HttpGet]
  public async Task<ActionResult<List<TicketResponse>>> GetFeed(
      [FromQuery] TicketFilterRequest filter)
  {
    var result = await _ticketService.GetFeedAsync(filter);
    return Ok(result);
  }

  [HttpGet("my-tickets")]
  public async Task<ActionResult<List<TicketResponse>>> GetMyTickets()
  {
    var result = await _ticketService.GetMyTicketsAsync(CurrentUserId);
    return Ok(result);
  }

  [HttpGet("{code}")]
  public async Task<ActionResult<TicketResponse>> GetByCode(string code)
  {
    var result = await _ticketService.GetByCodeAsync(code);
    return Ok(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpPatch("{code}/assign")]
  public async Task<ActionResult<TicketResponse>> AssignTechnician(
      string code,
      [FromBody] AssignTicketRequest request)
  {
    var result = await _ticketService.AssignTechnicianAsync(
        code,
        request,
        CurrentUserId,
        CurrentUserName);

    return Ok(result);
  }

  [Authorize(Roles = "Admin,Technician")]
  [HttpPatch("{code}/status")]
  public async Task<ActionResult<TicketResponse>> UpdateStatus(
      string code,
      [FromBody] UpdateTicketStatusRequest request)
  {
    var result = await _ticketService.MoveStatusAsync(
        code,
        request,
        CurrentUserId,
        CurrentUserName,
        CurrentUserRole);

    return Ok(result);
  }

  [HttpPost("{code}/confirm")]
  public async Task<ActionResult<TicketResponse>> ConfirmResolved(
      string code)
  {
    var result = await _ticketService.ConfirmResolvedAsync(
        code,
        CurrentUserId);

    return Ok(result);
  }
}
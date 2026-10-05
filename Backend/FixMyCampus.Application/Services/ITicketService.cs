using FixMyCampus.Application.DTOs.Tickets;
using FixMyCampus.Domain.Enums;

namespace FixMyCampus.Application.Services;

public interface ITicketService
{
  Task<TicketResponse> CreateAsync(
      CreateTicketRequest request,
      string reporterId,
      string reporterName);

  Task<List<TicketResponse>> GetFeedAsync(TicketFilterRequest filter);
  Task<List<TicketResponse>> GetMyTicketsAsync(string reporterId);
  Task<TicketResponse> GetByCodeAsync(string code);

  Task<TicketResponse> AssignTechnicianAsync(
      string code,
      AssignTicketRequest request,
      string adminId,
      string adminName);

  Task<TicketResponse> MoveStatusAsync(
      string code,
      UpdateTicketStatusRequest request,
      string userId,
      string userName,
      UserRole role);

  Task<TicketResponse> ConfirmResolvedAsync(
      string code,
      string reporterId);
}
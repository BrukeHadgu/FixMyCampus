using FixMyCampus.Domain.Enums;

namespace FixMyCampus.Application.Common;

public static class TicketWorkflow
{
  private static readonly Dictionary<TicketStatus, TicketStatus> NextStatusMap = new()
  {
    [TicketStatus.New] = TicketStatus.Assigned,
    [TicketStatus.Assigned] = TicketStatus.InProgress,
    [TicketStatus.InProgress] = TicketStatus.Resolved
  };

  public static TicketStatus? NextStatus(TicketStatus current) =>
      NextStatusMap.TryGetValue(current, out var next) ? next : null;

  public static string Label(TicketStatus status) =>
      status == TicketStatus.InProgress ? "In Progress" : status.ToString();

  public static void EnsureCanAssign(TicketStatus current)
  {
    if (current != TicketStatus.New)
      throw new InvalidOperationException($"Only tickets in 'New' can be assigned. This ticket is '{Label(current)}'.");
  }

  public static void EnsureCanMove(TicketStatus current, TicketStatus target)
  {
    if (target == TicketStatus.Assigned)
      throw new InvalidOperationException("Use the assign action to assign a technician.");

    var next = NextStatus(current);
    if (next is null)
      throw new InvalidOperationException($"Illegal status change from '{Label(current)}' to '{Label(target)}'. Ticket is already Resolved.");

    if (next != target)
      throw new InvalidOperationException($"Illegal status change from '{Label(current)}' to '{Label(target)}'. Next step must be '{Label(next.Value)}'.");
  }

  public static void EnsureCanConfirmFixed(TicketStatus current)
  {
    if (current != TicketStatus.Resolved)
      throw new InvalidOperationException("Only a Resolved ticket can be confirmed as fixed.");
  }
}
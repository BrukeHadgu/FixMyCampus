using FixMyCampus.Domain.Enums;
namespace FixMyCampus.Domain.Entities;
public class Category
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public TicketPriority DefaultPriority { get; set; } = TicketPriority.Medium;
  public string Code => $"CAT-{Id:D3}";
}
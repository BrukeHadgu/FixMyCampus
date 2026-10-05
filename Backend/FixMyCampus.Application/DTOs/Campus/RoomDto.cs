namespace FixMyCampus.Application.DTOs.Campus;

public class RoomDto
{
  public int Id { get; set; }
  public int BuildingId { get; set; }
  public string BuildingCode { get; set; } = string.Empty;
  public string Number { get; set; } = string.Empty;
  public string Code { get; set; } = string.Empty;
}
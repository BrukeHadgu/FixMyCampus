namespace FixMyCampus.Domain.Entities;

public class Room
{
  public int Id { get; set; }
  public int BuildingId { get; set; }
  public Building Building { get; set; } = null!;
  public string Number { get; set; } = string.Empty;
  public int? Floor { get; set; }
  public string Code { get; set; } = string.Empty;
  public bool IsActive { get; set; } = true;

  public static string BuildCode(string buildingCode, string roomNumber) =>
      $"{buildingCode.Trim().ToUpperInvariant()}-{roomNumber.Trim().ToUpperInvariant().Replace(' ', '-')}";
}
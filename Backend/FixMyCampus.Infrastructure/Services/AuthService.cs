using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FixMyCampus.Application.DTOs.Auth;
using FixMyCampus.Application.Services;
using FixMyCampus.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace FixMyCampus.Infrastructure.Services;

public class AuthService : IAuthService
{
  private readonly UserManager<FixMyCampusUser> _userManager;
  private readonly RoleManager<IdentityRole> _roleManager;
  private readonly IConfiguration _configuration;

  public AuthService(
      UserManager<FixMyCampusUser> userManager,
      RoleManager<IdentityRole> roleManager,
      IConfiguration configuration)
  {
    _userManager = userManager;
    _roleManager = roleManager;
    _configuration = configuration;
  }

  public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
  {
    var existingUser = await _userManager.FindByEmailAsync(request.Email);

    if (existingUser != null)
      throw new InvalidOperationException("A user with this email already exists.");

    var role = request.Role;

    var roleName = role.ToString();

    if (!await _roleManager.RoleExistsAsync(roleName))
    {
      var roleResult = await _roleManager.CreateAsync(
          new IdentityRole(roleName));

      if (!roleResult.Succeeded)
      {
        throw new InvalidOperationException(
            string.Join("; ", roleResult.Errors.Select(e => e.Description)));
      }
    }

    var user = new FixMyCampusUser
    {
      UserName = request.Email.Trim(),
      Email = request.Email.Trim(),
      FullName = request.FullName.Trim(),
      Role = role,
      IsActive = true,
      CreatedAt = DateTime.UtcNow
    };

    var result = await _userManager.CreateAsync(user, request.Password);

    if (!result.Succeeded)
    {
      throw new InvalidOperationException(
          string.Join("; ", result.Errors.Select(e => e.Description)));
    }

    await _userManager.AddToRoleAsync(user, roleName);

    return CreateAuthResponse(user);
  }

  public async Task<AuthResponse> LoginAsync(LoginRequest request)
  {
    var user = await _userManager.FindByEmailAsync(request.Email);

    if (user == null ||
        !await _userManager.CheckPasswordAsync(user, request.Password))
    {
      throw new UnauthorizedAccessException("Invalid email or password.");
    }

    if (!user.IsActive)
      throw new UnauthorizedAccessException("This account is inactive.");

    return CreateAuthResponse(user);
  }

  private AuthResponse CreateAuthResponse(FixMyCampusUser user)
  {
    var key = _configuration["Jwt:Key"]
        ?? throw new InvalidOperationException("JWT key is missing.");

    var issuer = _configuration["Jwt:Issuer"] ?? "FixMyCampus";
    var audience = _configuration["Jwt:Audience"] ?? "FixMyCampusApp";

    var claims = new[]
    {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Name, user.FullName),
            new Claim(ClaimTypes.Email, user.Email ?? string.Empty),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        };

    var credentials = new SigningCredentials(
        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
        SecurityAlgorithms.HmacSha256);

    var token = new JwtSecurityToken(
        issuer: issuer,
        audience: audience,
        claims: claims,
        expires: DateTime.UtcNow.AddHours(8),
        signingCredentials: credentials);

    return new AuthResponse
    {
      Token = new JwtSecurityTokenHandler().WriteToken(token),
      UserId = user.Id,
      Email = user.Email ?? string.Empty,
      FullName = user.FullName,
      Role = user.Role
    };
  }
}
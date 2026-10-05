using FixMyCampus.Application.DTOs.Auth;

namespace FixMyCampus.Application.Services;

public interface IAuthService
{
  Task<AuthResponse> RegisterAsync(RegisterRequest request);
  Task<AuthResponse> LoginAsync(LoginRequest request);
}
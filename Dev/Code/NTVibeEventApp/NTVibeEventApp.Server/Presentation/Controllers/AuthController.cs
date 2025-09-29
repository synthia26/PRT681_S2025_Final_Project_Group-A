using Microsoft.AspNetCore.Mvc;
using NTVibeEventApp.Server.BLL.Interfaces;
using NTVibeEventApp.Server.Presentation.DTOs;

namespace NTVibeEventApp.Server.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;

        private readonly IUserService _userService;

        public AuthController(ILogger<AuthController> logger, IUserService userService)
        {
            _userService = userService;
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDto dto)
        {
            try
            {
                _logger.LogInformation("Registration attempt for {Username} at {Time}", dto.Username, DateTime.UtcNow);

                var success = await _userService.RegisterAsync(dto);
                if (!success)
                {
                    _logger.LogWarning("Registration failed: User {Username} already exists", dto.Username);

                    return BadRequest("User already exists.");
                }

                _logger.LogInformation("User {Username} registered successfully", dto.Username);
                return Ok("Registration successful.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error during registration for {Username}", dto.Username);
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto dto)
        {
            try
            {
                _logger.LogInformation("Login attempt for {Username} at {Time}", dto.Username, DateTime.UtcNow);

                var user = await _userService.LoginAsync(dto);
                if (user == null)
                {
                    _logger.LogWarning("Login failed for {Username}", dto.Username);
                    return Unauthorized("Invalid credentials.");
                }

                _logger.LogInformation("User {Username} logged in successfully", dto.Username);
                return Ok(new { message = "Login successful", user.Username, user.Email, user.Role });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error during login for {Username}", dto.Username);
                return StatusCode(500, "Internal server error.");
            }
        }
    }
}

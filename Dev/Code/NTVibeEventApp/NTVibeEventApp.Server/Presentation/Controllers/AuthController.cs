using Microsoft.AspNetCore.Mvc;
using NTVibeEventApp.Server.BLL.Interfaces;
using NTVibeEventApp.Server.Presentation.DTOs;

namespace NTVibeEventApp.Server.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDto dto)
        {
            var success = await _userService.RegisterAsync(dto);
            if (!success)
                return BadRequest("User already exists.");

            return Ok("Registration successful.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto dto)
        {
            var user = await _userService.LoginAsync(dto);
            if (user == null)
                return Unauthorized("Invalid credentials.");

            return Ok(new { message = "Login successful", user.Username, user.Email, user.Role });
        }
    }
}

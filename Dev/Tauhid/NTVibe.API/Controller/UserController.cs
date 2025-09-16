using Microsoft.AspNetCore.Mvc;
using NTVibe.API.Models;
using NTVibe.API.Dtos;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    // A simplified in-memory list. In a real app, this would be a database context.
    private static readonly List<User> _users = new List<User>();

    [HttpPost("register")]
    public IActionResult RegisterUser([FromBody] UserRegistrationDto userDto)
    {
        if (_users.Any(u => u.Email == userDto.Email))
        {
            return BadRequest(new { message = "Email already registered." });
        }

        var newUser = new User
        {
            Id = _users.Count > 0 ? _users.Max(u => u.Id) + 1 : 1,
            Username = userDto.Username,
            Email = userDto.Email,
            Password = userDto.Password // Reminder: Hash this in a production app!
        };
        _users.Add(newUser);

        return Ok(new { message = "User registered successfully!" });
    }
}
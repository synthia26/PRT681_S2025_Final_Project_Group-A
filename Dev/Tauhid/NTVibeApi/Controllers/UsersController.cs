// NTVibeApi/Controllers/UsersController.cs
using Microsoft.AspNetCore.Mvc;
using NTVibeApi.Models;

[Route("[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    // A simple in-memory list to simulate a database for users.
    private static List<User> _users = new List<User>
    {
        // Add a sample organizer for testing purposes
        new User { Id = Guid.Parse("f9f0a8c2-263f-4e08-98e6-e97d8c51a0b5"), FullName = "Sample Organizer", Email = "organizer@example.com", Password = "password123", Role = "Organizer" },
        // Add a sample regular user
        new User { Id = Guid.Parse("d7f0a8c2-263f-4e08-98e6-e97d8c51a0b5"), FullName = "Sample User", Email = "user@example.com", Password = "password123", Role = "User" }
    };

    // API to register a new user with a specified role.
    // POST /Users/register
    [HttpPost("register")]
    public IActionResult Register([FromBody] UserRegistrationDto registrationData)
    {
        // Check if a user with the same email already exists.
        if (_users.Any(u => u.Email.ToLower() == registrationData.Email.ToLower()))
        {
            return BadRequest(new { message = "Email already in use." });
        }

        // Create a new user object.
        var newUser = new User
        {
            FullName = registrationData.FullName,
            Email = registrationData.Email,
            // In a real application, you would hash the password here.
            Password = registrationData.Password,
            Role = registrationData.Role // "User" or "Organizer"
        };
        
        _users.Add(newUser);
        
        return CreatedAtAction(nameof(GetUserById), new { id = newUser.Id }, newUser);
    }

    // API to log in a user.
    // POST /Users/login
    [HttpPost("login")]
    public IActionResult Login([FromBody] UserDto loginData)
    {
        // Find the user by their email and password.
        var user = _users.FirstOrDefault(u => 
            u.Email.ToLower() == loginData.Email.ToLower() && 
            u.Password == loginData.Password); // In a real app, you would check the hashed password.

        if (user == null)
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        // Generate a simple token. In a real app, this would be a JWT with a short expiration.
        var token = "some_long_and_secure_token_" + user.Id;

        // Return a successful authentication response.
        var authResponse = new AuthResponse
        {
            UserId = user.Id,
            Token = token,
            Role = user.Role
        };
        
        return Ok(authResponse);
    }

    // API to get a user's profile by their ID.
    // GET /Users/{id}
    [HttpGet("{id}")]
    public IActionResult GetUserById(Guid id)
    {
        var user = _users.FirstOrDefault(u => u.Id == id);
        
        if (user == null)
        {
            return NotFound();
        }

        // Don't send the password back! Create a safe DTO or anonymous object.
        var userProfile = new 
        {
            user.Id,
            user.FullName,
            user.Email,
            user.Role
        };

        return Ok(userProfile);
    }
}

// A DTO for registration, which includes the full name and role.
public class UserRegistrationDto : UserDto
{
    public required string FullName { get; set; }
    public required string Role { get; set; }
}

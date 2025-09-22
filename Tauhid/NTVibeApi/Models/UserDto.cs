// NTVibeApi/Models/UserDto.cs
// This is a Data Transfer Object (DTO) used for user registration and login.
// We use a DTO to control which data is sent to and from the client,
// preventing exposure of unnecessary or sensitive information.
public class UserDto
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}

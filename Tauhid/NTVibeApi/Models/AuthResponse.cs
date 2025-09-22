// NTVibeApi/Models/AuthResponse.cs
// This model defines the response returned after a successful login.
public class AuthResponse
{
    // The user's unique ID.
    public required Guid UserId { get; set; }

    // A simple token. In a real application, this would be a JWT.
    public required string Token { get; set; }

    // The user's assigned role.
    public required string Role { get; set; }
}

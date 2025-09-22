// NTVibeApi/Models/User.cs
// This model represents a user in our application.
// We'll use a simple in-memory list to store users for this example.
public class User
{
    // A unique identifier for the user.
    public Guid Id { get; set; } = Guid.NewGuid();

    // The user's email, which will be their username.
    public required string Email { get; set; }

    // The user's full name.
    public required string FullName { get; set; }

    // The user's password. In a real-world app, this would be a hashed password, not plain text.
    public required string Password { get; set; }

    // The user's role. We'll use this to differentiate between standard users and organizers.
    public required string Role { get; set; } // e.g., "User", "Organizer"
}

namespace NTVibeEventApp.Server.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = "User"; // default role
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

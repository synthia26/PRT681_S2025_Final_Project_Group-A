// NTVibeApi/Models/Community.cs
// This model represents a community.
public class Community
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Name { get; set; }
}

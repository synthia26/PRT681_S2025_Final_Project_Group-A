// NTVibeApi/Models/Category.cs
// This model represents a category for events.
public class Category
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Name { get; set; }
}

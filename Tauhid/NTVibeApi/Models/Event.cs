// The `namespace` organizes our code.
namespace CommunityEventsApi.Models
{
    // A C# class is a blueprint for an object.
    // In this case, an Event will have an Id, Title, and Description.
    public class Event
    {
        // `Id` will be a unique identifier for each event.
        public Guid Id { get; set; } = Guid.NewGuid();

        // `required` tells the compiler that this property must be provided.
        public required string Title { get; set; }

        // `required` tells the compiler that this property must be provided.
        public required string Description { get; set; }

        // We'll also add a date and community for more detail.
        public required DateTime EventDate { get; set; }

        public required string Community { get; set; }
    }
}

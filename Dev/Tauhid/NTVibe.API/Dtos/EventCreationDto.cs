namespace NTVibe.API.Dtos
{
    public class EventCreationDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTime EventDate { get; set; }
        public string Community { get; set; }
        public int OrganizerId { get; set; }
    }
}
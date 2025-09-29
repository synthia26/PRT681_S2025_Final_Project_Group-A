namespace NTVibeEventApp.Server.Presentation.DTOs
{
    public class EventCreateDto
    {
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
    }
}

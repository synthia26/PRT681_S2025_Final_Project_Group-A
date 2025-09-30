namespace NTVibeEventApp.Server.Presentation.DTOs
{
    public class EventCreateDto
    {
        public string Title { get; set; }
        public string Date { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Price { get; set; }
    }
}

namespace NTVibeEventApp.Server.Entities
{
    public class Event
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Date { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string? BannerFilePath { get; set; }
        public string Price { get; set; } = "Free";
    }
}

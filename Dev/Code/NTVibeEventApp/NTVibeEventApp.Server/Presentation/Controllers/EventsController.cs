using Microsoft.AspNetCore.Authorization;
using System;
using Microsoft.AspNetCore.Mvc;
using NTVibeEventApp.Server.Entities;
using NTVibeEventApp.Server.DAL.Context;
using NTVibeEventApp.Server.Presentation.DTOs;
using System.Text.Json;

namespace NTVibeEventApp.Server.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        private readonly string _filePath;

        public EventsController(IWebHostEnvironment env)
        {
            _filePath = Path.Combine(env.ContentRootPath, "Data", "events.json");
        }

        // GET: api/events
        [HttpGet]
        public IActionResult GetEvents()
        {
            var events = ReadEventsFromFile();
            return Ok(events);
        }

        [HttpGet("{id}")]
        public IActionResult GetEventById(int id)
        {
            var events = ReadEventsFromFile();
            var ev = events.FirstOrDefault(e => e.Id == id);

            if (ev == null) return NotFound();
            return Ok(ev);
        }


        // POST: api/events
        [HttpPost]
        public IActionResult CreateEvent([FromForm] Event newEvent, IFormFile? banner)
        {
            var events = ReadEventsFromFile();

            newEvent.Id = events.Any() ? events.Max(e => e.Id) + 1 : 1;

            // Save banner file if provided
            if (banner != null)
            {
                var uploadPath = Path.Combine("wwwroot", "uploads");
                Directory.CreateDirectory(uploadPath);

                var filePath = Path.Combine(uploadPath, banner.FileName);
                using var stream = new FileStream(filePath, FileMode.Create);
                banner.CopyTo(stream);

                newEvent.BannerFilePath = $"uploads/{banner.FileName}";
            }

            events.Add(newEvent);
            WriteEventsToFile(events);

            return Ok(newEvent);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEvent(int id)
        {
            var events = ReadEventsFromFile();
            var ev = events.FirstOrDefault(e => e.Id == id);

            if (ev == null)
                return NotFound("Event not found");

            // Remove from list
            events.Remove(ev);

            // Save back to JSON file
            WriteEventsToFile(events);

            return Ok(new { message = "Event deleted successfully" });
        }

        // Helper: read JSON file
        private List<Event> ReadEventsFromFile()
        {
            if (!System.IO.File.Exists(_filePath))
                return new List<Event>();

            var json = System.IO.File.ReadAllText(_filePath);
            return string.IsNullOrWhiteSpace(json)
                ? new List<Event>()
                : JsonSerializer.Deserialize<List<Event>>(json) ?? new List<Event>();
        }

        // Helper: write JSON file
        private void WriteEventsToFile(List<Event> events)
        {
            var json = JsonSerializer.Serialize(events, new JsonSerializerOptions { WriteIndented = true });
            System.IO.File.WriteAllText(_filePath, json);
        }
        /*       private readonly ApplicationDbContext _context;
               private readonly IWebHostEnvironment _env;

               public EventsController(ApplicationDbContext context, IWebHostEnvironment env)
               {
                   _context = context;
                   _env = env;
               }

               [HttpPost]
               [Authorize(Roles = "Organiser")]
               public async Task<IActionResult> Create([FromForm] EventCreateDto dto, IFormFile? banner)
               {
                   var newEvent = new Event
                   {
                       Title = dto.Title,
                       Date = dto.Date,
                       Location = dto.Location,
                       Description = dto.Description,
                       Category = dto.Category
                   };

                   if (banner != null)
                   {
                       var uploadFolder = Path.Combine(_env.WebRootPath, "uploads");
                       Directory.CreateDirectory(uploadFolder);

                       var filePath = Path.Combine(uploadFolder, banner.FileName);
                       using var stream = new FileStream(filePath, FileMode.Create);
                       await banner.CopyToAsync(stream);

                       newEvent.BannerFilePath = $"uploads/{banner.FileName}";
                   }

                   _context.Events.Add(newEvent);
                   await _context.SaveChangesAsync();

                   return Ok("Event created successfully");
               }*/
    }
}

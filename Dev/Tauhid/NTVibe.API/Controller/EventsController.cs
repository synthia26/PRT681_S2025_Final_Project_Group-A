using Microsoft.AspNetCore.Mvc;
using NTVibe.API.Models;
using NTVibe.API.Dtos;

[Route("api/[controller]")]
[ApiController]
public class EventsController : ControllerBase
{
    private static readonly List<Event> _events = new List<Event>();

    [HttpPost("create")]
    public IActionResult CreateEvent([FromBody] EventCreationDto eventDto)
    {
        var newEvent = new Event
        {
            Id = _events.Count > 0 ? _events.Max(e => e.Id) + 1 : 1,
            Title = eventDto.Title,
            Description = eventDto.Description,
            Location = eventDto.Location,
            EventDate = eventDto.EventDate,
            Community = eventDto.Community,
            OrganizerId = eventDto.OrganizerId // In a real app, you'd validate this against a logged-in user.
        };
        _events.Add(newEvent);

        return CreatedAtAction(nameof(GetEvents), new { id = newEvent.Id }, newEvent);
    }

    [HttpGet]
    public IActionResult GetEvents()
    {
        return Ok(_events);
    }
}
using CommunityEventsApi.Models;
using Microsoft.AspNetCore.Mvc;

// This attribute tells .NET that this is an API controller.
[ApiController]
[Route("[controller]")]
public class EventsController : ControllerBase
{
    // For this example, we will store events in a static list in memory.
    // This data will be reset every time the application is restarted.
    private static readonly List<Event> _events = new List<Event>();

    // API 1: GET /events
    // This method gets all events.
    [HttpGet]
    public ActionResult<IEnumerable<Event>> GetEvents()
    {
        return Ok(_events);
    }

    // API 2: GET /events/{id}
    // This method gets a single event by its unique ID.
    [HttpGet("{id}")]
    public ActionResult<Event> GetEvent(Guid id)
    {
        var eventItem = _events.FirstOrDefault(e => e.Id == id);

        if (eventItem == null)
        {
            // If the event is not found, return a 404 Not Found error.
            return NotFound();
        }

        return Ok(eventItem);
    }

    // API 3: POST /events
    // This method allows a new event to be created.
    [HttpPost]
    public ActionResult<Event> PostEvent(Event newEvent)
    {
        // Assign a new ID to the event.
        newEvent.Id = Guid.NewGuid();
        // Add the new event to our static list.
        _events.Add(newEvent);

        // Return a 201 Created status and the newly created event.
        // This also includes a "Location" header pointing to the new event's URL.
        return CreatedAtAction(nameof(GetEvent), new { id = newEvent.Id }, newEvent);
    }
}

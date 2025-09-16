import React, { useEffect, useState } from 'react';

// Define the shape of an Event object using a TypeScript interface
interface Event {
    id: number;
    title: string;
    description: string;
    location: string;
    eventDate: string; // The date is typically a string from the API
    community: string;
}

const EventList: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        // Asynchronously fetch events from the API
        const fetchEvents = async () => {
            try {
                // The URL corresponds to the GET /api/events endpoint
                const response = await fetch('/api/events');
                if (response.ok) {
                    const data: Event[] = await response.json();
                    setEvents(data);
                } else {
                    console.error('Failed to fetch events:', response.statusText);
                }
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
        };

        fetchEvents();
    }, []); // The empty dependency array ensures this effect runs only once on component mount

    return (
        <div>
            <h2>Upcoming Vibe Events ✨</h2>
            {events.length > 0 ? (
                <div className="event-list-container">
                    {events.map((event) => (
                        <div key={event.id} className="event-card">
                            <h3>{event.title}</h3>
                            <p><strong>Community:</strong> {event.community}</p>
                            <p><strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}</p>
                            <p><strong>Location:</strong> {event.location}</p>
                            <p>{event.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No events found. Be the first to post a new vibe!</p>
            )}
        </div>
    );
};

export default EventList;
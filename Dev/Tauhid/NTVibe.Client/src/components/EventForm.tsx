import React, { useState } from 'react';

const EventForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [community, setCommunity] = useState('');
    const [organizerId, setOrganizerId] = useState<number | ''>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simple validation to ensure all fields are filled
        if (!title || !description || !location || !eventDate || !community || organizerId === '') {
            alert('Please fill out all fields.');
            return;
        }

        const newEvent = {
            title,
            description,
            location,
            eventDate: new Date(eventDate).toISOString(), // Format date for the API
            community,
            organizerId: Number(organizerId),
        };

        try {
            // The URL corresponds to the POST /api/events/create endpoint
            const response = await fetch('/api/events/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            });

            if (response.ok) {
                alert('Event posted successfully!');
                // Reset form fields after successful submission
                setTitle('');
                setDescription('');
                setLocation('');
                setEventDate('');
                setCommunity('');
                setOrganizerId('');
            } else {
                console.error('Failed to post event:', response.statusText);
                alert('Failed to post event. Please try again.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred. Please check your network connection.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Post a New Vibe</h3>
            <label>
                Event Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>
            <label>
                Description:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </label>
            <label>
                Location:
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
            </label>
            <label>
                Date:
                <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
            </label>
            <label>
                Community:
                <input type="text" value={community} onChange={(e) => setCommunity(e.target.value)} required />
            </label>
            <label>
                Organizer ID:
                <input type="number" value={organizerId} onChange={(e) => setOrganizerId(Number(e.target.value))} required />
            </label>
            <button type="submit">Post Vibe</button>
        </form>
    );
};

export default EventForm;
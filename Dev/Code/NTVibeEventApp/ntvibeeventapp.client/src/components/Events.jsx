import React, { useEffect, useState } from "react";
import { getEvents } from "../api/events";
import { Link } from "react-router-dom";

export default function EventList() {
    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const perPage = 6; // events per page

    useEffect(() => {
        async function fetchEvents() {
            try {
                const data = await getEvents();
                setEvents(data);
            } catch (err) {
                console.error("Failed to fetch events:", err);
            }
        }
        fetchEvents();
    }, []);

    // Pagination logic
    const totalPages = Math.ceil(events.length / perPage);
    const paginatedEvents = events.slice((page - 1) * perPage, page * perPage);

    if (events.length === 0) {
        return (
            <div className="container text-center my-5">
                <h3>No upcoming events</h3>
            </div>
        );
    }

    return (
        <div className="container my-4">
            <h2 className="mb-4">Upcoming Events</h2>
            <div className="row">
                {paginatedEvents.map((event) => (
                    <div className="col-md-4 mb-3" key={event.id}>
                        <div className="card shadow-sm">
                            {event.bannerFilePath && (
                                <img
                                    src={`https://localhost:7125/${event.bannerFilePath}`}
                                    className="card-img-top"
                                    alt={event.title}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                            )}
                            <div className="card-body">
                                <h5 className="card-title">{event.title}</h5>
                                <p className="card-text">
                                    {event.date}
                                </p>
                                <Link to={`/events/${event.id}`} className="btn btn-primary btn-sm">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ✅ Show pagination only if >1 page */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                    <button
                        className="btn btn-outline-secondary me-2"
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                    >
                        ← Prev
                    </button>
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                        disabled={page === totalPages}
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
}

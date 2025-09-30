import React, { useEffect, useState } from "react";
import { getEvents } from "../api/events";
import { Link } from "react-router-dom";

export default function EventList() {
    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
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

    // ✅ Filter events by search term
    const filteredEvents = events.filter((e) =>
        e.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ✅ Pagination logic based on filtered results
    const totalPages = Math.ceil(filteredEvents.length / perPage);
    const paginatedEvents = filteredEvents.slice(
        (page - 1) * perPage,
        page * perPage
    );

    if (filteredEvents.length === 0) {
        return (
            <div className="container text-center my-5">
                {/* ✅ Search bar even if no results */}
                <input
                    type="text"
                    className="form-control mb-4"
                    placeholder="🔍 Search events by title..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setPage(1); // reset to first page
                    }}
                    style={{ maxWidth: "400px", margin: "0 auto" }}
                />
                <h3>No upcoming events</h3>
            </div>
        );
    }

    return (
        <div className="container my-4">
            <h2 className="mb-4">Upcoming Events</h2>

            {/* ✅ Search input */}
            <input
                type="text"
                className="form-control mb-4"
                placeholder="🔍 Search events by title..."
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1); // reset to first page when searching
                }}
                style={{ maxWidth: "400px" }}
            />

            <div className="row">
                {paginatedEvents.map((event) => (
                    <div className="col-md-4 mb-3" key={event.id}>
                        <div className="card shadow-sm h-100">
                            {event.bannerFilePath && (
                                <img
                                    src={`https://localhost:7125/${event.bannerFilePath}`}
                                    className="card-img-top"
                                    alt={event.title}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                            )}
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{event.title}</h5>
                                <p className="card-text">{event.date}</p>
                                <Link
                                    to={`/events/${event.id}`}
                                    className="btn btn-primary btn-sm mt-auto"
                                >
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

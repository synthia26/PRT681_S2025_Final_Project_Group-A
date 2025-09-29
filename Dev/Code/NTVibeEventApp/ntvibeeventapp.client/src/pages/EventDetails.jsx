import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEventById } from "../api/events";

export default function EventDetails() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        async function fetchEvent() {
            try {
                const data = await getEventById(id);
                setEvent(data);
            } catch (err) {
                console.error("Failed to fetch event:", err);
            }
        }
        fetchEvent();
    }, [id]);

    if (!event) return <p className="text-center">Loading...</p>;

    return (
        <div className="container my-4">
            {/* ✅ Banner */}
            {event.bannerFilePath && (
                <div className="mb-4">
                    <img
                        src={`https://localhost:7125/${event.bannerFilePath}`}
                        alt="Event Banner"
                        className="img-fluid w-100"
                        style={{ maxHeight: "400px", objectFit: "cover" }}
                    />
                </div>
            )}

            {/* ✅ Two-column layout */}
            <div className="row">
                {/* Left column → Event details */}
                <div className="col-md-8">
                    <h1>{event.title}</h1>
                    <p>
                        <strong>Date:</strong>{" "}
                        {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p>
                        <strong>Category:</strong> {event.category}
                    </p>

                    <h3>About this event</h3>
                    <p>{event.description}</p>
                </div>

                {/* Right column → Back button + Location card */}
                <div className="col-md-4">
                    <div className="d-flex justify-content-end mb-3">
                        <Link to="/events" className="btn btn-success btn-sm">
                            ← Back
                        </Link>
                    </div>

                    <div className="card shadow-sm p-3">
                        <h5>Location</h5>
                        <p>{event.location}</p>

                        <h5>Price</h5>
                        <p>{event.price ?? "Free"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

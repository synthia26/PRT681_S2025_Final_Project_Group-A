import { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardActions
} from "@progress/kendo-react-layout";
import events from "../data/events";

export default function Home() {
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        alert(`Searching for: ${search}`); // later connect to backend
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                background: "linear-gradient(135deg, #E95420, #FFB347)",
                color: "white",
                fontFamily: "Arial, sans-serif",
            }}
        >
            {/* Top Menu */}
            <header
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "15px 30px",
                    backgroundColor: "rgba(0,0,0,0.2)",
                }}
            >
                <h2 style={{ margin: 0 }}>🌴 NT Vibe</h2>
                <nav>
                    <a href="/" style={{ color: "white", marginRight: "20px" }}>Home</a>
                    <a href="/register" style={{ color: "white", marginRight: "20px" }}>Register</a>
                    <a href="/login" style={{ color: "white" }}>Login</a>
                </nav>
            </header>

            {/* Main Content */}
            <main style={{ flex: 1, textAlign: "center", padding: "40px" }}>
                <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>
                    NT Vibe Event Organiser
                </h1>
                <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto 30px" }}>
                    Bringing people together in the heart of the Northern Territory.
                    Discover events, RSVP instantly, and be part of vibrant community
                    celebrations under the Top End skies.
                </p>

                {/* Search Bar */}
                <form onSubmit={handleSearch} style={{ marginBottom: "40px" }}>
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            padding: "10px",
                            width: "300px",
                            borderRadius: "5px 0 0 5px",
                            border: "none",
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            padding: "10px 20px",
                            border: "none",
                            backgroundColor: "#006400",
                            color: "white",
                            borderRadius: "0 5px 5px 0",
                            cursor: "pointer",
                        }}
                    >
                        Search
                    </button>
                </form>

                {/* Event Cards */}
                <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
                    {events.map((event) => (
                        <Card key={event.id} style={{ width: 300 }}>
                            <CardHeader>
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    style={{ width: "100%", borderRadius: "6px 6px 0 0" }}
                                />
                            </CardHeader>
                            <CardBody>
                                <CardTitle>{event.title}</CardTitle>
                                <p style={{ fontSize: "0.9rem", margin: "10px 0" }}>{event.description}</p>
                                <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
                                <p><strong>Location:</strong> {event.location}</p>
                            </CardBody>
                            <CardActions>
                                <button
                                    style={{
                                        background: "#007bff",
                                        color: "white",
                                        padding: "8px 14px",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                >
                                    View Details
                                </button>
                            </CardActions>
                        </Card>
                    ))}
                </div>

                {/* Explore More Button */}
                <button
                    style={{
                        padding: "12px 24px",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        backgroundColor: "#006400",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        marginTop: "30px"
                    }}
                >
                    Explore More
                </button>
            </main>
        </div>
    );
}

import React, { useEffect, useState } from "react";
import { getEvents } from "../api/events";

export default function Events() {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 6; // adjust how many per page

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getEvents();
                setEvents(data);
            } catch (err) {
                console.error("Failed to fetch events:", err);
            }
        }
        fetchData();
    }, []);

    // Pagination logic
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    const totalPages = Math.ceil(events.length / eventsPerPage);

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>📅 All Events</h2>
            <div style={styles.grid}>
                {currentEvents.map((event) => (
                    <div key={event.id} style={styles.card}>
                        {event.bannerFilePath && (
                            <img
                                src={`https://localhost:7125/${event.bannerFilePath}`}
                                alt="Event Banner"
                                style={styles.image}
                            />
                        )}
                        <h3>{event.title}</h3>
                        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                        <p><strong>Location:</strong> {event.location}</p>
                        <p>{event.description}</p>
                        
                    </div>
                ))}
            </div>

            {/* Pagination controls */}
            <div style={styles.pagination}>
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    ⬅ Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        style={{
                            ...styles.pageButton,
                            backgroundColor: currentPage === i + 1 ? "#006400" : "#fff",
                            color: currentPage === i + 1 ? "#fff" : "#000",
                        }}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next ➡
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: "40px",
        textAlign: "center",
    },
    title: {
        fontSize: "2rem",
        marginBottom: "20px",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
    },
    card: {
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "left",
    },
    image: {
        width: "100%",
        borderRadius: "6px",
        marginTop: "10px",
    },
    pagination: {
        marginTop: "30px",
        display: "flex",
        justifyContent: "center",
        gap: "10px",
    },
    pageButton: {
        padding: "8px 12px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "pointer",
    },
};

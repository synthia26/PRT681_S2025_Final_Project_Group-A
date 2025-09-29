import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEventById } from "../api/events";

export default function EventDetails() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [showZoom, setShowZoom] = useState(false);

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

    if (!event) return <p style={{ textAlign: "center" }}>Loading...</p>;

    return (
        <div style={styles.page}>
            {/* ✅ Banner below navbar */}
            {event.bannerFilePath && (
                <div style={styles.bannerWrapper}>
                    <img
                        src={`https://localhost:7125/${event.bannerFilePath}`}
                        alt="Event Banner"
                        style={styles.bannerImage}
                    />

                    {/* ✅ Zoom icon at top-right */}
                    <button
                        style={styles.zoomButton}
                        onClick={() => setShowZoom(true)}
                    >
                        ⤢
                    </button>
                </div>
            )}

            {/* ✅ Title and details BELOW banner */}
            <div style={styles.content}>
                <h1 style={styles.title}>{event.title}</h1>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Category:</strong> {event.category}</p>

                <div style={styles.description}>
                    <h3>About this event</h3>
                    <p>{event.description}</p>
                </div>

                <Link to="/events" style={styles.backButton}>
                    ← Back to Events
                </Link>
            </div>

            {/* ✅ Modal for full image */}
            {showZoom && (
                <div style={styles.modal}>
                    <span style={styles.close} onClick={() => setShowZoom(false)}>
                        ✖
                    </span>
                    <img
                        src={`https://localhost:7125/${event.bannerFilePath}`}
                        alt="Zoomed Banner"
                        style={styles.zoomImage}
                    />
                </div>
            )}
        </div>
    );
}

const styles = {
    page: {
        width: "100%",
        margin: 0,
        padding: 0,
    },
    bannerWrapper: {
        position: "relative", // ✅ to position zoom button
        width: "100%",
        height: "400px",
        overflow: "hidden",
    },
    bannerImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
    },
    zoomButton: {
        position: "absolute",
        top: "12px",
        right: "12px",
        background: "rgba(0,0,0,0.7)",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: "32px",        // smaller circle
        height: "32px",
        display: "flex",      // center the arrow
        alignItems: "center",
        justifyContent: "center",
        fontSize: "16px",     // smaller arrow
        cursor: "pointer",
        transition: "0.3s ease",
    },
    zoomButtonHover: {
        background: "rgba(0,0,0,0.9)",
        transform: "scale(1.1)",
    },
    content: {
        padding: "40px",
        maxWidth: "900px",
        margin: "0 auto",
        textAlign: "left",
    },
    title: {
        fontSize: "2.5rem",
        marginBottom: "20px",
        color: "#222",
    },
    description: {
        marginTop: "20px",
    },
    backButton: {
        display: "inline-block",
        marginTop: "30px",
        padding: "10px 16px",
        background: "#006400",
        color: "#fff",
        borderRadius: "6px",
        textDecoration: "none",
    },
    modal: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
    },
    close: {
        position: "absolute",
        top: "20px",
        right: "30px",
        fontSize: "30px",
        color: "#fff",
        cursor: "pointer",
    },
    zoomImage: {
        maxWidth: "90%",
        maxHeight: "90%",
        borderRadius: "8px",
    },
};

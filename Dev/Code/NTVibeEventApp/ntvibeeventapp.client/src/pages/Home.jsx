import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getEvents } from "../api/events";

export default function Home() {
    const [featuredEvents, setFeaturedEvents] = useState([]);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const data = await getEvents();

                // ✅ Filter only upcoming events
                const today = new Date();
                const upcoming = data.filter((e) => new Date(e.date) >= today);

                // ✅ Sort by nearest date
                upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));

                // ✅ Take first 3 only
                setFeaturedEvents(upcoming.slice(0, 3));
            } catch (err) {
                console.error("Failed to fetch events:", err);
            }
        }
        fetchEvents();
    }, []);

    return (
        <div style={{ width: "100%", overflowX: "hidden" }}>
            
            {/* Banner Section */}
            <div style={styles.banner}>
                <img src={`${import.meta.env.BASE_URL}assets/banner.jpg`} alt="Banner" style={styles.bannerImage} />
                <div style={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="🔍 Search events..."
                        style={styles.searchBar}
                    />
                </div>
            </div>

            {/* Featured Events */}
            <section style={styles.featuredSection}>
                <h2 style={styles.sectionTitle}>🎉 Upcoming Featured Events</h2>

                {featuredEvents.length === 0 ? (
                    <p>No upcoming events</p>
                ) : (
                    <div style={styles.eventList}>
                        {featuredEvents.map((event) => (
                            <div key={event.id} style={styles.eventCard}>
                                {event.bannerFilePath && (
                                    <img
                                        src={`https://localhost:7125/${event.bannerFilePath}`}
                                        alt={event.title}
                                        style={styles.cardImage}
                                    />
                                )}
                                <h3>{event.title}</h3>
                                <p>
                                    <strong>Date:</strong>{" "}
                                    {event.date}
                                </p>
                                <p>
                                    <strong>Location:</strong> {event.location}
                                </p>
                                <Link to={`/events/${event.id}`} style={styles.detailsLink}>
                                    View Details →
                                </Link>
                            </div>
                        ))}
                    </div>
                )}

                <div>
                    <Link to="/events" style={styles.moreButton}>
                        View More Events →
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}

const styles = {
    banner: {
        position: "relative",
        width: "100vw",
        height: "400px",
        overflow: "hidden",
        margin: 0,
        padding: 0,
    },
    bannerImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    searchContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: 50,
        transform: "translate(-50%, -50%)",
        zIndex: 1,
    },
    searchBar: {
        padding: "15px 20px",
        fontSize: "1.2rem",
        borderRadius: "8px",
        border: "none",
        width: "300px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    },
    featuredSection: {
        padding: "40px 20px",
        textAlign: "center",
    },
    sectionTitle: {
        fontSize: "2rem",
        marginBottom: "30px",
    },
    eventList: {
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        flexWrap: "wrap",
    },
    eventCard: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: "280px",
        textAlign: "left",
        transition: "transform 0.2s",
    },
    cardImage: {
        width: "100%",
        height: "150px",
        objectFit: "cover",
        borderRadius: "8px",
        marginBottom: "10px",
    },
    detailsLink: {
        display: "inline-block",
        marginTop: "10px",
        color: "#006400",
        fontWeight: "bold",
        textDecoration: "none",
    },
    moreButton: {
        marginTop: "30px",
        padding: "12px 24px",
        backgroundColor: "#006400",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        fontSize: "1rem",
        cursor: "pointer",
        textDecoration: "none",
        display: "inline-block",
    },
};

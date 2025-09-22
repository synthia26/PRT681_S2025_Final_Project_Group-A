import { useState } from "react";

export default function Home() {
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        alert(`Searching for: ${search}`);
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h2 style={styles.logo}>🌴 NT Vibe</h2>
                <nav style={styles.nav}>
                    <a href="/" style={styles.navButton}>Home</a>
                    <a href="/register" style={styles.navButton}>Register</a>
                    <a href="/login" style={styles.navButton}>Login</a>
                </nav>
            </header>

            <main style={styles.mainContent}>
                <h1 style={styles.heading}>
                    NT Vibe Event Organiser
                </h1>
                <p style={styles.subheading}>
                    Bringing people together in the heart of the Northern Territory.
                    Discover events, RSVP instantly, and be part of vibrant community
                    celebrations under the Top End skies.
                </p>

                <form onSubmit={handleSearch} style={styles.searchForm}>
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={styles.searchInput}
                    />
                    <button
                        type="submit"
                        style={styles.searchButton}
                    >
                        Search
                    </button>
                </form>

                <div style={styles.carouselContainer}>
                    {["Music Festival", "Food Market", "Art Expo"].map((event, i) => (
                        <div key={i} style={styles.carouselItem}>
                            {event}
                        </div>
                    ))}
                </div>

                <button style={styles.exploreButton}>
                    Explore More
                </button>
            </main>
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        width: "100vw", // Corrected line
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #E95420, #FFB347)",
        color: "white",
        fontFamily: "Arial, sans-serif",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        backgroundColor: "rgba(0,0,0,0.2)",
    },
    logo: {
        margin: 0,
        fontSize: "1.5rem",
    },
    nav: {
        display: "flex",
        gap: "15px",
    },
    navButton: {
        color: "white",
        textDecoration: "none",
        fontWeight: "bold",
        padding: "10px 15px",
        borderRadius: "5px",
        backgroundColor: "rgba(0,0,0,0.2)",
        transition: "background-color 0.3s",
    },
    mainContent: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "40px",
        width: "100%",
    },
    heading: {
        fontSize: "3rem",
        marginBottom: "20px",
    },
    subheading: {
        fontSize: "1.2rem",
        maxWidth: "700px",
        margin: "0 auto 30px",
    },
    searchForm: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "40px",
        width: "100%",
    },
    searchInput: {
        padding: "12px",
        flex: 1,
        maxWidth: "500px",
        borderRadius: "5px 0 0 5px",
        border: "none",
        fontSize: "1rem",
    },
    searchButton: {
        padding: "12px 25px",
        border: "none",
        backgroundColor: "#006400",
        color: "white",
        borderRadius: "0 5px 5px 0",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "bold",
    },
    carouselContainer: {
        display: "flex",
        overflowX: "auto",
        gap: "20px",
        padding: "10px",
        marginBottom: "30px",
        width: "100%",
        maxWidth: "900px",
    },
    carouselItem: {
        minWidth: "300px",
        height: "180px",
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.2rem",
        flexShrink: 0,
    },
    exploreButton: {
        padding: "15px 30px",
        fontSize: "1.1rem",
        fontWeight: "bold",
        backgroundColor: "#006400",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
    },
};
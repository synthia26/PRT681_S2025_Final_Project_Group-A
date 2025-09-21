import { useState } from "react";

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

                {/* Carousel (Static Demo) */}
                <div
                    style={{
                        display: "flex",
                        overflowX: "auto",
                        gap: "20px",
                        padding: "10px",
                        marginBottom: "30px",
                    }}
                >
                    {["Music Festival", "Food Market", "Art Expo"].map((event, i) => (
                        <div
                            key={i}
                            style={{
                                minWidth: "250px",
                                height: "150px",
                                backgroundColor: "rgba(255,255,255,0.2)",
                                borderRadius: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.2rem",
                            }}
                        >
                            {event}
                        </div>
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
                    }}
                >
                    Explore More
                </button>
            </main>
        </div>
    );
}
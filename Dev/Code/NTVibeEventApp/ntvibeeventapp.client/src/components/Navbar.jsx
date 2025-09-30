import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const location = useLocation();

    const isActive = (path) =>
        location.pathname === path ? styles.activeLink : {};

    return (
        <nav style={styles.nav}>
            {/* Logo */}
            <div style={styles.logo}>🎫 NT Vibe Together</div>

            {/* Links */}
            <div style={styles.links}>
                <Link to="/" style={{ ...styles.link, ...isActive("/") }}>Home</Link>
                {!user && <Link to="/register" style={styles.link}>Register</Link>}
                {!user && <Link to="/login" style={styles.link}>Login</Link>}
                <Link to="/events" style={{ ...styles.link, ...isActive("/events") }}>
                    Explore Events
                </Link>
                {user?.role === "Organiser" && (
                    <Link to="/addevents" style={styles.link}>Add Events</Link>
                )}
                {user && (
                    <Link to="/" onClick={logout} style={styles.link}>
                        Logout
                    </Link>
                )}
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        background: "linear-gradient(90deg, #FFB347, #E95420)", // 🔥 Light → Dark
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    },
    logo: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        color: "white",
    },
    links: {
        display: "flex",
        gap: "20px",
    },
    link: {
        color: "white",
        textDecoration: "none",
        fontSize: "1rem",
        fontWeight: "500",
        transition: "opacity 0.3s",
    },
    activeLink: {
        textDecoration: "underline",
        fontWeight: "bold",
    },
};

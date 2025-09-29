import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>🎫 NT Vibe Together</div>
            <div style={styles.links}>
                <Link to="/">Home</Link>
                {!user && <Link to="/login">Login</Link>}
                {!user && <Link to="/register">Register</Link>}
                {user && <Link to="/" onClick={logout}>Logout</Link>}
                {user?.role === "Organiser" && <Link to="/addevents">Add Events</Link>}
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '15px 30px',
        backgroundColor: '#333',
        color: 'white',
        alignItems: 'center',
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    links: {
        display: 'flex',
        gap: '20px',
    },
};

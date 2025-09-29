import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import bannerImage from '../assets/banner.jpg';

export default function Home() {
    return (
        <div style={{ width: "100%", overflowX: "hidden" }}>
            

            {/* Banner Section */}
            <div style={styles.banner}>
                <img src={bannerImage} alt="Event Banner" style={styles.bannerImage} />
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
                <div style={styles.eventList}>
                    {/* Example events */}
                    {["Event A", "Event B", "Event C"].map((event, i) => (
                        <div key={i} style={styles.eventCard}>
                            <h3>{event}</h3>
                            <p>Date: TBD</p>
                            <p>Location: TBD</p>
                        </div>
                    ))}
                </div>

                <button style={styles.moreButton}>View More Events</button>
            </section>

            <Footer />
        </div>
    );
}

const styles = {
    banner: {
        position: 'relative',
        width: '100vw',
        height: '400px',
        overflow: 'hidden',
        margin: 0,
        padding: 0
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    searchContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1
    },
    searchBar: {
        padding: '15px 20px',
        fontSize: '1.2rem',
        borderRadius: '8px',
        border: 'none',
        width: '300px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    },
    featuredSection: {
        padding: '40px 20px',
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: '2rem',
        marginBottom: '30px',
    },
    eventList: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap',
    },
    eventCard: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: '250px',
        textAlign: 'left',
    },
    moreButton: {
        marginTop: '30px',
        padding: '12px 24px',
        backgroundColor: '#006400',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        fontSize: '1rem',
        cursor: 'pointer',
    },
};

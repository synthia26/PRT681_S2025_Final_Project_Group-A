import React from 'react';

export default function Footer() {
    return (
        <footer style={styles.footer}>
            <p>&copy; {new Date().getFullYear()} EventApp. All rights reserved.</p>
        </footer>
    );
}

const styles = {
    footer: {
        padding: '20px',
        backgroundColor: '#222',
        color: '#fff',
        textAlign: 'center',
        marginTop: '40px',
    },
};

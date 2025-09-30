import React, { useState } from 'react';
import { createEvent } from '../api/events';
import { useNavigate } from 'react-router-dom';

export default function AddEvent() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '',
        date: '',
        location: '',
        description: '',
        category: 'Conference',
    });

    const [message, setMessage] = useState('');
    const [bannerFile, setBannerFile] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setBannerFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in form) formData.append(key, form[key]);
        if (bannerFile) formData.append("banner", bannerFile);

        try {
            await createEvent(formData);
            setMessage("Event created successfully!");
            navigate("/events"); // redirect to events page
        } catch (err) {
            console.error(err);
            setMessage("Failed to create event");
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.heading}>Add New Event</h2>

                <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required style={styles.input} />
                <input type="date" name="date" value={form.date} onChange={handleChange} required style={styles.input} />
                <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required style={styles.input} />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    style={styles.textarea}
                />

                <select name="category" value={form.category} onChange={handleChange} style={styles.input}>
                    <option value="Festival">Festival</option>
                    <option value="Show">Show</option>
                    <option value="Concert">Concert</option>
                    <option value="Meetup">Meetup</option>
                    <option value="Others">Others</option>
                </select>

                <input type="file" onChange={handleFileChange} style={styles.input} />

                <button type="submit" style={styles.button}>Create Event</button>
                {message && <p style={styles.message}>{message}</p>}
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        padding: '40px',
        background: '#f9f9f9',
    },
    form: {
        background: '#fff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    heading: {
        textAlign: 'center',
        color: '#333',
    },
    input: {
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '1rem',
    },
    textarea: {
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        resize: 'vertical',
    },
    button: {
        backgroundColor: '#006400',
        color: '#fff',
        padding: '12px',
        borderRadius: '6px',
        border: 'none',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    message: {
        textAlign: 'center',
        color: '#E95420',
        fontWeight: 'bold',
    },
};

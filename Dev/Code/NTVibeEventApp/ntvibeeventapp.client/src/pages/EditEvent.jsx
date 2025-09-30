import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, updateEvent } from "../api/events";

export default function EditEvent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        description: "",
        date: "",
        category: "",
        location: "",
        price: "",
    });
    const [banner, setBanner] = useState(null);

    useEffect(() => {
        async function fetchEvent() {
            const data = await getEventById(id);
            setForm({
                title: data.title,
                description: data.description,
                date: data.date.split("T")[0], // ✅ for date input
                category: data.category,
                location: data.location,
                price: data.price,
            });
        }
        fetchEvent();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setBanner(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            Object.keys(form).forEach((key) => formData.append(key, form[key]));
            if (banner) formData.append("banner", banner);

            await updateEvent(id, formData);
            alert("Event updated successfully!");
            navigate(`/events/${id}`);
        } catch (err) {
            console.error("Update failed:", err);
            alert("Failed to update event");
        }
    };

    return (
        <div className="container my-4">
            <h2>Edit Event</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="form-control"
                        rows="4"
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                        type="text"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Banner (optional)</label>
                    <input
                        type="file"
                        name="banner"
                        onChange={handleFileChange}
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Save Changes
                </button>
            </form>
        </div>
    );
}

import { useState } from "react";
import { registerUser } from "../api/auth";

export default function RegisterForm() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await registerUser(form);
            setMessage(res.data);
        } catch (err) {
            setMessage(err.response?.data || "Error registering user");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input placeholder="Username" value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })} />
            <input placeholder="Email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input type="password" placeholder="Password" value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button type="submit">Register</button>
            <p>{message}</p>
        </form>
    );
}

import { useState } from "react";
import { loginUser } from "../api/auth";

export default function LoginForm() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUser(form);
            localStorage.setItem("user", JSON.stringify(res.data)); // store user
            setMessage("Login successful!");
        } catch (err) {
            setMessage(err.response?.data || "Invalid credentials");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input placeholder="Email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input type="password" placeholder="Password" value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button type="submit">Login</button>
            <p>{message}</p>
        </form>
    );
}

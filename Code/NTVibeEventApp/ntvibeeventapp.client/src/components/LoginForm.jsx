import { useState } from "react";
import { loginUser } from "../api/auth";

export default function LoginForm() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

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
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.heading}>Login</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="📧 Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="🔒 Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <button type="submit" style={styles.button}>
                    Login
                </button>

                {message && <p style={styles.message}>{message}</p>}
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #E95420, #FFB347)",
    },
    form: {
        background: "white",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        width: "600px",
        maxWidth: "90%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    heading: {
        textAlign: "center",
        color: "#E95420",
        marginBottom: "20px",
        fontSize: "2rem",
    },
    input: {
        padding: "15px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        fontSize: "1.1rem",
        outline: "none",
    },
    button: {
        backgroundColor: "#006400",
        color: "white",
        padding: "15px",
        borderRadius: "6px",
        border: "none",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "0.3s",
        fontSize: "1.1rem",
    },
    message: {
        textAlign: "center",
        fontWeight: "bold",
        color: "#E95420",
        fontSize: "1.1rem",
    },
};
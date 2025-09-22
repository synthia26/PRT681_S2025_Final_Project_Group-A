import { useState } from "react";
import { registerUser } from "../api/auth";

export default function RegisterForm() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
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
            const res = await registerUser(form);
            setMessage(res.data);
        } catch (err) {
            setMessage(err.response?.data || "Error registering user");
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.heading}>Create an Account</h2>

                <input
                    type="text"
                    name="username"
                    placeholder="👤 Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

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
                    Register
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
        padding: "40px", // Increased padding
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        width: "600px", // Increased form width
        maxWidth: "90%", // Ensures it's responsive on smaller screens
        display: "flex",
        flexDirection: "column",
        gap: "20px", // Increased gap between elements
    },
    heading: {
        textAlign: "center",
        color: "#E95420",
        marginBottom: "20px",
        fontSize: "2rem", // Increased font size
    },
    input: {
        padding: "15px", // Increased input padding
        borderRadius: "6px",
        border: "1px solid #ccc",
        fontSize: "1.1rem", // Increased font size
        outline: "none",
    },
    button: {
        backgroundColor: "#006400",
        color: "white",
        padding: "15px", // Increased button padding
        borderRadius: "6px",
        border: "none",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "0.3s",
        fontSize: "1.1rem", // Increased font size
    },
    message: {
        textAlign: "center",
        fontWeight: "bold",
        color: "#E95420",
        fontSize: "1.1rem", // Increased font size
    },
};
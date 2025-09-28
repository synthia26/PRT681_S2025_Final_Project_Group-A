import { useState } from "react";
import { loginUser } from "../api/auth";

export default function LoginForm() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");


    // handle input change
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
                <h2 style={styles.heading}>Create an Account</h2>

                <input
                    type="text"
                    name="username"                 // ✅ must match state keys
                    placeholder="👤 Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <input
                    type="email"
                    name="email"                    // ✅ must match state keys
                    placeholder="📧 Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <input
                    type="password"
                    name="password"                 // ✅ must match state keys
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
        minHeight: "80vh",
        background: "linear-gradient(135deg, #E95420, #FFB347)",
    },
    form: {
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        width: "350px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    heading: {
        textAlign: "center",
        color: "#E95420",
        marginBottom: "10px",
    },
    input: {
        padding: "12px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        fontSize: "1rem",
        outline: "none",
    },
    button: {
        backgroundColor: "#006400",
        color: "white",
        padding: "12px",
        borderRadius: "6px",
        border: "none",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "0.3s",
    },
    message: {
        textAlign: "center",
        fontWeight: "bold",
        color: "#E95420",
    },
};

/*
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
*/
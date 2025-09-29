import { useState } from "react";
import { registerUser } from "../api/auth";

export default function RegisterForm() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        role: "User",
    });
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
                    className="form-control"
                    placeholder="👤 Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="📧 Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="🔒 Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                {/* Role Dropdown */}
                <select
                    name="role"
                    className="form-select"
                    value={form.role}
                    onChange={handleChange}
                >
                    <option value="User">User</option>
                    <option value="Organiser">Organiser</option>
                </select>

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
        background: "linear-gradient(135deg, #E95420, #FFB347)", // keep your gradient
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

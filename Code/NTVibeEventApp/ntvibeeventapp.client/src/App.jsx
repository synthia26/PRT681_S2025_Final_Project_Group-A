import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";      // import Home component
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

export default function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Home</Link> |{" "}
                <Link to="/register">Register</Link> |{" "}
                <Link to="/login">Login</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />          {/* shows Home.jsx */}
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </Router>
    );
}

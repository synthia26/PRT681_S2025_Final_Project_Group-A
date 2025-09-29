import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Events from './pages/Events.jsx';
import AddEvent from './pages/AddEvent.jsx';
import EventDetails from "./pages/EventDetails.jsx";
import Navbar from './components/Navbar.jsx';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/events" element={<Events />} />
                <Route path="/addevents" element={<AddEvent />} />
                <Route path="/events/:id" element={<EventDetails />} />
                {/* AddEvents route can go here too */}
            </Routes>
        </Router>
    );
};

export default App;

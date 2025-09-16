import React from 'react';
import './App.css';
import RegistrationForm from './components/RegistrationForm';
import EventList from './components/EventList';
import EventForm from './components/EventForm';

function App() {
  return (
    <div className="App">
      <header>
        <h1>NTVibe 🌏</h1>
        <p>Your one-stop service for Northern Territory community events.</p>
      </header>
      <main>
        <section>
          <h2>Register as a User or Organizer</h2>
          <RegistrationForm />
        </section>
        <hr />
        <section>
          <h2>Post a New Event</h2>
          <p>Organizers can use this form to share their events with the community.</p>
          <EventForm />
        </section>
        <hr />
        <section>
          <EventList />
        </section>
      </main>
    </div>
  );
}

export default App;
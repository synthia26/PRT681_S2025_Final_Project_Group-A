import React, { useState, useEffect } from 'react';

// Define the structure of our models to match the C# backend.
interface Event {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  community: string;
}

interface Community {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

interface AuthResponse {
    userId: string;
    token: string;
    role: string;
}

const App: React.FC = () => {
  // State for all our data
  const [events, setEvents] = useState<Event[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  // State for forms
  const [eventFormData, setEventFormData] = useState({
    title: '',
    description: '',
    eventDate: '',
    community: '',
    category: ''
  });
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });
  const [registerFormData, setRegisterFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'User'
  });

  // State for authentication and UI
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(true); // Toggle between login and registration forms

  // The base URL for our backend API.
  const API_BASE_URL = 'http://localhost:5234';

  // --- API Fetching Logic ---
  useEffect(() => {
    // Fetch events, communities, and categories on initial load
    const fetchInitialData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [eventsResponse, communitiesResponse, categoriesResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/Events`),
          fetch(`${API_BASE_URL}/Communities`),
          fetch(`${API_BASE_URL}/Communities/categories`)
        ]);

        if (!eventsResponse.ok) throw new Error('Failed to fetch events.');
        if (!communitiesResponse.ok) throw new Error('Failed to fetch communities.');
        if (!categoriesResponse.ok) throw new Error('Failed to fetch categories.');

        const eventsData: Event[] = await eventsResponse.json();
        const communitiesData: Community[] = await communitiesResponse.json();
        const categoriesData: Category[] = await categoriesResponse.json();

        setEvents(eventsData);
        setCommunities(communitiesData);
        setCategories(categoriesData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // --- Form Handling ---
  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEventFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData(prevState => ({ ...prevState, [name]: value }));
  };
  
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRegisterFormData(prevState => ({ ...prevState, [name]: value }));
  };
  
  // --- API Submission Logic ---
  const handleEventSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/Events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventFormData),
      });

      if (!response.ok) {
        throw new Error('Failed to create event.');
      }

      const newEvent: Event = await response.json();
      setEvents(prevEvents => [...prevEvents, newEvent]);

      setEventFormData({
        title: '',
        description: '',
        eventDate: '',
        community: '',
        category: ''
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/Users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginFormData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed.');
      }

      const authResponse: AuthResponse = await response.json();
      setIsLoggedIn(true);
      setUserRole(authResponse.role);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/Users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerFormData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed.');
      }

      // Automatically log in the user after successful registration.
      const authResponse: AuthResponse = await response.json();
      setIsLoggedIn(true);
      setUserRole(authResponse.role);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-8 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-indigo-800 mb-8 text-center">
          NTVibe Community Events
        </h1>

        {error && (
            <div className="bg-red-500 text-white p-4 rounded-lg mb-6 text-center shadow-lg">
                {error}
            </div>
        )}

        {/* Conditional Rendering based on login status */}
        {!isLoggedIn ? (
          <div className="bg-white p-8 rounded-2xl shadow-xl mb-12">
            <div className="flex justify-center mb-6">
                <button 
                    onClick={() => setShowLogin(true)}
                    className={`px-6 py-2 rounded-l-lg font-bold transition-colors ${showLogin ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Login
                </button>
                <button 
                    onClick={() => setShowLogin(false)}
                    className={`px-6 py-2 rounded-r-lg font-bold transition-colors ${!showLogin ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Register
                </button>
            </div>
            
            {showLogin ? (
                <form onSubmit={handleLoginSubmit} className="space-y-6">
                    <h2 className="text-3xl font-bold text-indigo-800 mb-6 text-center">Login</h2>
                    <div>
                        <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            id="loginEmail"
                            name="email"
                            value={loginFormData.email}
                            onChange={handleLoginChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                    </div>
                    <div>
                        <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            id="loginPassword"
                            name="password"
                            value={loginFormData.password}
                            onChange={handleLoginChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
                            disabled={loading}
                        >
                            {loading ? 'Logging In...' : 'Login'}
                        </button>
                    </div>
                </form>
            ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-6">
                    <h2 className="text-3xl font-bold text-indigo-800 mb-6 text-center">Register</h2>
                    <div>
                        <label htmlFor="registerFullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            id="registerFullName"
                            name="fullName"
                            value={registerFormData.fullName}
                            onChange={handleRegisterChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                    </div>
                    <div>
                        <label htmlFor="registerEmail" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            id="registerEmail"
                            name="email"
                            value={registerFormData.email}
                            onChange={handleRegisterChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                    </div>
                    <div>
                        <label htmlFor="registerPassword" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            id="registerPassword"
                            name="password"
                            value={registerFormData.password}
                            onChange={handleRegisterChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                    </div>
                    <div>
                        <label htmlFor="registerRole" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select
                            id="registerRole"
                            name="role"
                            value={registerFormData.role}
                            onChange={handleRegisterChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        >
                            <option value="User">User</option>
                            <option value="Organizer">Organizer</option>
                        </select>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
                            disabled={loading}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </form>
            )}
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-xl mb-6">
                <p className="text-xl font-semibold text-gray-800">Welcome! You are logged in as a {userRole}.</p>
                <button 
                    onClick={handleLogout}
                    className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg"
                >
                    Logout
                </button>
            </div>

            {/* Event Creation Form - Only visible to Organizers */}
            {userRole === 'Organizer' && (
              <div className="bg-white p-8 rounded-2xl shadow-xl mb-12">
                <h2 className="text-3xl font-bold text-indigo-800 mb-6 text-center">
                  Create New Event
                </h2>
                <form onSubmit={handleEventSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={eventFormData.title}
                        onChange={handleEventChange}
                        placeholder="e.g., Bangladeshi Night"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="community" className="block text-sm font-medium text-gray-700 mb-1">Community</label>
                      <select
                        id="community"
                        name="community"
                        value={eventFormData.community}
                        onChange={handleEventChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      >
                        <option value="">Select a Community</option>
                        {communities.map(comm => (
                          <option key={comm.id} value={comm.name}>{comm.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={eventFormData.description}
                      onChange={handleEventChange}
                      placeholder="Details about the event..."
                      required
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                      <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        value={eventFormData.eventDate}
                        onChange={handleEventChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        id="category"
                        name="category"
                        value={eventFormData.category}
                        onChange={handleEventChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      >
                        <option value="">Select a Category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
                      disabled={loading}
                    >
                      {loading ? 'Adding Event...' : 'Add Event'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Display fetched events */}
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-indigo-800 mb-6 text-center">
            Upcoming Events
          </h2>
          {loading && <p className="text-center text-gray-600">Loading events...</p>}
          {events.length === 0 && !loading && !error && (
            <p className="text-center text-gray-600">No events to display. Add one above!</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-lg text-indigo-600 mb-2 font-medium">Community: {event.community}</p>
                <p className="text-lg text-purple-600 mb-2 font-medium">Category: {event.category}</p>
                <p className="text-sm text-gray-500 mb-4">Date: {new Date(event.eventDate).toLocaleDateString()}</p>
                <p className="text-gray-700">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

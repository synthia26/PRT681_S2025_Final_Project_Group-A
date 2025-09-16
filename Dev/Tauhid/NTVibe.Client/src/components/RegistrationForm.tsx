import React, { useState } from 'react';

const RegistrationForm: React.FC = () => {
    const [isOrganizer, setIsOrganizer] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = isOrganizer ? '/api/organizers/register' : '/api/users/register';
        const payload = isOrganizer
            ? { contactEmail: email, password, organizationName: username }
            : { username, email, password };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Registration failed:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Register as an Organizer?
                <input
                    type="checkbox"
                    checked={isOrganizer}
                    onChange={(e) => setIsOrganizer(e.target.checked)}
                />
            </label>
            <label>
                {isOrganizer ? "Organization Name:" : "Username:"}
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;
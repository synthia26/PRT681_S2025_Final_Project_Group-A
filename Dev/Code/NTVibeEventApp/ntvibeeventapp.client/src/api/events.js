import axios from 'axios';

const API_URL = "https://localhost:7125/api/events";

export const createEvent = async (formData) => {
    return await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

// Fetch all events
export const getEvents = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getEventById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const deleteEvent = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};

export const updateEvent = async (id, formData) => {
    return await axios.put(`${API_URL}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};
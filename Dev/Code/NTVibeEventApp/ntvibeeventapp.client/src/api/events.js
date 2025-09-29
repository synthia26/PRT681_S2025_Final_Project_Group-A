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

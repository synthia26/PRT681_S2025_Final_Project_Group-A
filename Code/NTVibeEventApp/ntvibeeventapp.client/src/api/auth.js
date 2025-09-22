import axios from "axios";

// Update the API_URL to match the backend's exact route path.
const Auth = "http://localhost:5173/api/Auth";

export const registerUser = async (user) => {
    return await axios.post(`${API_URL}/register`, user);
};

export const loginUser = async (user) => {
    return await axios.post(`${API_URL}/login`, user);
};
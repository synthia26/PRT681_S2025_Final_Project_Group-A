import axios from "axios";

const API_URL = "https://localhost:7125/api/auth"; // match backend

export const registerUser = async (user) => {
    return await axios.post(`${API_URL}/register`, user);
};

export const loginUser = async (user) => {
    return await axios.post(`${API_URL}/login`, user);
};
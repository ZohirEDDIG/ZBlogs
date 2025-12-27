import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getUserByUsername = (username) => {
    return axios.get(`${API_URL}/users/${username}`);
};

export { getUserByUsername };
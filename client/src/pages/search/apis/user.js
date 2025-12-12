import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getSearchUsers = (query) => {
    return axios.get(`${API_URL}/users/search/${query}`);
};

export { getSearchUsers };
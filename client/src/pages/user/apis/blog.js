import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getUserBlogs = (userId) => {
    return axios.get(`${API_URL}/blogs/user/${userId}`);
};

export { getUserBlogs };
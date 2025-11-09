import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getLatestBlogs = () => {
    return axios.get(`${API_URL}/blogs/latest`);
};

const getTrendingBlogs = () => {
    return axios.get(`${API_URL}/blogs/trending`);
};

const getTopics = () => {
    return axios.get(`${API_URL}/blogs/topics`);
};

export { getLatestBlogs, getTrendingBlogs, getTopics };
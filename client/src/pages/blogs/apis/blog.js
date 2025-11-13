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

const getTopicBlogs = (topic) => {
    console.log(`${API_URL}/blogs/topic/${topic}`);
    return axios.get(`${API_URL}/blogs/topic/${topic}`);
}

export { getLatestBlogs, getTrendingBlogs, getTopics, getTopicBlogs };
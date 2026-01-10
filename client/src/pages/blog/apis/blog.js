import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getBlog = (blogId) => {
    return axios.get(`${API_URL}/blogs/${blogId}`);
};

const getSimilarBlogs = (topics) => {
    return axios.post(`${API_URL}/blogs/similar`, { topics, limit: 6 });
};

export { getBlog, getSimilarBlogs };
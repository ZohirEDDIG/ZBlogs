import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getSearchBlogs = ({ query, currentPage }) => {
    return axios.get(`${API_URL}/blogs/search/${query}?page=${currentPage}&limit=20`);
};

export { getSearchBlogs };
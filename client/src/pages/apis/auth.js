import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const register = (registerData) => {
    return axios.post(`${API_URL}/auth/register`, registerData);
};

const login = (loginData) => {
    return axios.post(`${API_URL}/auth/login`, loginData);
};

const me = (token) => {
    return axios.get(`${API_URL}/auth/me`, { headers: { authorization: `Bearer ${token}` } });
};

export { register, login, me };
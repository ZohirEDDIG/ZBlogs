import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const uploadImageByFile = ({ formData, token }) => {
    return axios.post(`${API_URL}/blogs/upload-image-by-file`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        }
    });
};

const uploadBlog = ({ blogData, token }) => {
    return axios.post(`${API_URL}/blogs/upload-blog`, blogData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
};

export { uploadImageByFile, uploadBlog };
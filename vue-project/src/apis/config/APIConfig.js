import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com';

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Optional auth token injection
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Centralized error handling for protected routes
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response && [401, 403].includes(error.response.status)) {
            console.warn('Authentication required. Redirect to login or refresh token.');
        }
        return Promise.reject(error);
    }
);

export default api;

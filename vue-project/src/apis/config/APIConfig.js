import axios from 'axios';

// Lấy base URL từ biến môi trường, mặc định là jsonplaceholder
const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com';

/**
 * Cấu hình Axios instance cho API calls
 * Bao gồm interceptor xử lý token và lỗi authentication
 * Created By Ban - 01/06/2026
 */
const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * Request interceptor
 * Tự động thêm access token vào header nếu tồn tại
 */
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

/**
 * Response interceptor
 * Xử lý lỗi authentication (401, 403)
 * Có thể thêm logic redirect tới login hoặc refresh token tại đây
 */
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

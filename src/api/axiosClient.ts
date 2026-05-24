import axios from 'axios';
import { clearStoredToken, getStoredToken } from '../utils/authStorage';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleUnauthorized = () => {
  clearStoredToken();
  window.dispatchEvent(new Event('auth:unauthorized'));

  if (window.location.pathname !== '/login') {
    window.location.assign('/login');
  }
};

axiosClient.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      handleUnauthorized();
    }
    return Promise.reject(error);
  }
);

export default axiosClient;

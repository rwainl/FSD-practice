import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

api.interceptors.request.use(
  (response) => response,
  (error) => {
    if(!error.repsonse) {
      return Promise.reject({
        message: "Failed connecting to server",
      })
    }

    const {status, data} = error.response;

    if(status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      
      if(!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(data || error);
  }
);

export default api;

import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProducts = () => api.get('/products');
export const getProductById = (id) => api.get(`/products/${id}`);

export const login = (creds) => api.post('/auth/login', creds);
export const register = (userData) => api.post('/auth/register', userData);

// TODO: Create API functions untuk products
// Example:
// export const getProducts = () => api.get('/products');
// export const getProductById = (id) => api.get(`/products/${id}`);

// TODO: Create API functions untuk auth
// export const login = (credentials) => api.post('/auth/login', credentials);
// export const register = (userData) => api.post('/auth/register', userData);

export default api;


/**
 * API Client Configuration (STARTER)
 * TODO: Setup axios instance dengan proper configuration
 * 
 * Learning objectives:
 * - Configure axios dengan baseURL
 * - Add request/response interceptors
 * - Handle errors globally
 */

import axios from 'axios';

// TODO 1: Get baseURL from environment variable
// HINT: const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// TODO 2: Create axios instance
// HINT: const apiClient = axios.create({
// HINT:   baseURL,
// HINT:   timeout: 15000,
// HINT:   headers: {
// HINT:     'Content-Type': 'application/json',
// HINT:   },
// HINT: });
const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// TODO 3: Add request interceptor untuk auth token
// apiClient.interceptors.request.use(
//   (config) => {
//     // TODO: Get token from localStorage
//     // TODO: If token exists, add to Authorization header
//     
//     // HINT: const token = localStorage.getItem('auth_token');
//     // HINT: if (token) {
//     // HINT:   config.headers.Authorization = `Bearer ${token}`;
//     // HINT: }
//     // HINT: return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

// TODO 4: Add response interceptor untuk error handling
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // TODO: Handle network errors
//     // TODO: Handle HTTP errors (401, 404, 500, etc.)
//     // TODO: If 401, clear token dan redirect ke login
//     
//     // HINT: if (!error.response) {
//     // HINT:   return Promise.reject({
//     // HINT:     message: 'Cannot connect to server'
//     // HINT:   });
//     // HINT: }
//   }
// );
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


// TODO 5: Export apiClient
// export default apiClient;
export default api;

// ==========================================
// USAGE EXAMPLE
// ==========================================

/*
// In any component atau service:
import apiClient from './services/api';

// GET request
const response = await apiClient.get('/api/products');
const products = response.data.data;

// POST request
const response = await apiClient.post('/api/auth/login', {
  email: 'test@example.com',
  password: 'password123'
});

// With query parameters
const response = await apiClient.get('/api/products', {
  params: { category: 'Vitamin' }
});

ERROR HANDLING:

try {
  const response = await apiClient.get('/api/products');
  // Handle success
} catch (error) {
  // Error already formatted by interceptor
}

NEXT STEPS:
1. Complete TODOs 1-5
2. Test dengan simple GET request
3. Check network tab di DevTools
4. Verify Authorization header added (jika ada token)
5. Compare dengan finished-project
*/


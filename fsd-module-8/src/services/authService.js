import api from './api';

export const register = async(userData) => {
    try {
        const response = await api.post('/auth/register', userData);

        if(response.data.success && response.data.token) {
            localStorage.setItem('auth_token', response.data.token);

            if(response.data.user) {
                localStorage.setItem('user_data', response.data.user);
            }
            return response.data;
        }

        throw new Error(response.data.message || 'Registration failed.');
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message || 'Registration failed. Please try again.');
    }
}

export const login = async(email, password) => {
    try {
        const response = await api.post('/auth/login', {
            email, password
        });

        if(response.data.success && response.data.token) {
            localStorage.setItem('auth_token', response.data.token);
            if(response.data.user) {
                localStorage.setItem('user_data', JSON.stringify(response.data.user))
            }
            return response.data;
        }
        throw new Error(response.data.message || 'Login failed.');
    } catch (error) {
        // console.error(error.message);
        throw new Error(error.response?.data?.message || error.message || 'Failed login. Check your email and password');
    }
}

export const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
};

export const getProfile = async() => {
    try {
        const response = await api.get('/auth/profile');

        if(response.data.success && response.data.data) {
            localStorage.setItem('user_data', JSON.stringify(response.data.data));
        }
        
        throw new Error(response.data.message || 'Failed to get profile.');
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to get profile. Try again.');
    }
}

export const isAuthenticated = async() => {
    const token = localStorage.getItem('auth_token');
    return !!token;
}

export const getCurrentUser = async() => {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse('userData') : null;
}

// TODO: Register function
// export const register = async (userData) => {
//   // POST /api/auth/register
//   // Save token & user data
//   // Return response
// };

// TODO: Login function
// export const login = async (email, password) => {
//   // POST /api/auth/login
//   // Save token & user data
//   // Return response
// };

// TODO: Logout function
// export const logout = () => {
//   // Remove token & user data from localStorage
// };

// TODO: Get Profile function
// export const getProfile = async () => {
//   // GET /api/auth/profile
//   // Update user data
//   // Return user data
// };

// TODO: isAuthenticated helper
// export const isAuthenticated = () => {
//   // Check if token exists in localStorage
// };

// TODO: Update Profile function
// export const updateProfile = async (formData) => {
//   // PUT /api/auth/profile dengan FormData
//   // Headers: Content-Type: multipart/form-data
//   // Update user data di localStorage
//   // Return updated user data
// };

// TODO: getCurrentUser helper
// export const getCurrentUser = () => {
//   // Get user data from localStorage
// };


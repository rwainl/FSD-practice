import api from './api';

export const register = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);

        if (response.data.success && response.data.token) {
            localStorage.setItem('auth_token', response.data.token);

            if (response.data.user) {
                localStorage.setItem('user_data', JSON.stringify(response.data.user));
            }
            return response.data;
        }

        throw new Error(response.data.message || 'Registration failed.');
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message || 'Registration failed. Please try again.');
    }
}

export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });

        if (response.data.success && response.data.token) {
            localStorage.setItem('auth_token', response.data.token);
            if (response.data.user) {
                localStorage.setItem('user_data', JSON.stringify(response.data.user));
            }
            return response.data;
        }
        throw new Error(response.data.message || 'Login failed.');
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message || 'Failed login. Check your email and password');
    }
}

export const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
};

export const getProfile = async () => {
    try {
        const response = await api.get('/auth/profile');

        if (response.data.success && response.data.data) {
            localStorage.setItem('user_data', JSON.stringify(response.data.data));
            return response.data.data; // ✅ FIX: Kembalikan data jika berhasil
        }

        throw new Error(response.data.message || 'Failed to get profile.');
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to get profile. Try again.');
    }
}

// ✅ FIX: Hapus keyword async karena localStorage bersifat synchronous
export const isAuthenticated = () => {
    const token = localStorage.getItem('auth_token');
    return !!token;
}

export const getCurrentUser = () => {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
}
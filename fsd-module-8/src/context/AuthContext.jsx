import { useState, createContext, useContext, useEffect } from "react";
import { isAuthenticated, getCurrentUser, logout as logoutService, logout } from '../services/authService'

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const authenticated = isAuthenticated();
            const userData = getCurrentUser();
            
            setIsLoggedIn(authenticated);
            setUser(userData);
            setLoading(false);
        }

        checkAuth();
    }, []);

    const login = (userData, token) => {
        setUser(userData);
        setIsLoggedIn(true);

        window.dispatchEvent(new Event('auth-changed'));
    };

    return (
        <AuthContext.Provider 
            value={{
                user,
                isLoggedIn,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


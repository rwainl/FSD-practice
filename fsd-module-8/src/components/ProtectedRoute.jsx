import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'
import { Spin } from 'antd'

function ProtectedRoute({ children }) {
    const { isLoggedIn, loading } = useAuth();
    const location = useLocation();

    if(loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spin size='large' />
            </div>
        );
    }

    if(!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    
  return children;
}

export default ProtectedRoute


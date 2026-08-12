/**
 * Authentication Context
 * 
 * TODO untuk peserta:
 * 1. Import createContext, useContext, useState, useEffect dari 'react'
 * 2. Import authService functions (isAuthenticated, getCurrentUser, logout)
 * 3. Create AuthContext dengan createContext()
 * 4. Create useAuth hook untuk access context
 * 5. Create AuthProvider component:
 *    - State: user, isLoggedIn, loading
 *    - Initialize dari localStorage
 *    - useEffect untuk check auth on mount
 *    - login function: set user & isLoggedIn, trigger cart refresh
 *    - logout function: clear user, trigger cart refresh
 *    - updateUser function: update user state
 * 
 * Reference: ../finished-project/src/context/AuthContext.jsx
 */

// TODO: Import dependencies
// import { createContext, useContext, useState, useEffect } from 'react';
// import { isAuthenticated, getCurrentUser, logout as logoutService } from '../services/authService';

// TODO: Create context
// const AuthContext = createContext();

// TODO: Create useAuth hook
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };

// TODO: Create AuthProvider component
// export function AuthProvider({ children }) {
//   // State: user, isLoggedIn, loading
//   // Initialize from localStorage
//   // useEffect to check auth
//   // login function
//   // logout function
//   // updateUser function
//   // Return provider with value
// }


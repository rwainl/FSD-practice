/**
 * Theme Context (STARTER)
 * TODO: Complete the dark mode implementation
 * 
 * Learning objectives:
 * - Create React Context untuk global state
 * - Implement dark mode toggle
 * - Persist theme di localStorage
 */

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // TODO 1: Initialize theme state
  // HINT: const [theme, setTheme] = useState('light');
  
  // TODO 2: Load theme dari localStorage on mount
  useEffect(() => {
    // TODO: Get saved theme from localStorage
    // TODO: Set theme state
    // TODO: Apply theme to document
    
    // HINT: const savedTheme = localStorage.getItem('theme') || 'light';
    // HINT: setTheme(savedTheme);
    // HINT: document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // TODO 3: Implement toggleTheme function
  const toggleTheme = () => {
    // TODO: Calculate new theme (light → dark, dark → light)
    // TODO: Update state
    // TODO: Save to localStorage
    // TODO: Apply to document
    
    // HINT: const newTheme = theme === 'light' ? 'dark' : 'light';
    // HINT: setTheme(newTheme);
    // HINT: localStorage.setItem('theme', newTheme);
    // HINT: document.documentElement.setAttribute('data-theme', newTheme);
    
    // BONUS: Add 'dark' class to html element for Tailwind dark mode
    // HINT: if (newTheme === 'dark') {
    // HINT:   document.documentElement.classList.add('dark');
    // HINT: } else {
    // HINT:   document.documentElement.classList.remove('dark');
    // HINT: }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// TODO 4: Create custom hook
export function useTheme() {
  // TODO: Get context
  // TODO: Throw error if used outside provider
  // TODO: Return context
  
  // HINT: const context = useContext(ThemeContext);
  // HINT: if (!context) {
  // HINT:   throw new Error('useTheme must be used within ThemeProvider');
  // HINT: }
  // HINT: return context;
}

// ==========================================
// USAGE EXAMPLE
// ==========================================

/*
// In main.jsx:
<ThemeProvider>
  <App />
</ThemeProvider>

// In any component:
import { useTheme } from './context/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}

TAILWIND DARK MODE:

// tailwind.config.js
module.exports = {
  darkMode: 'class', // Use .dark class
  // ...
}

// Use dark: prefix
<div className="bg-white dark:bg-gray-800 text-black dark:text-white">

NEXT STEPS:
1. Complete TODOs 1-4
2. Add ThemeProvider to main.jsx
3. Use useTheme in Navbar untuk toggle button
4. Test dark mode works dan persists
5. Compare dengan finished-project
*/


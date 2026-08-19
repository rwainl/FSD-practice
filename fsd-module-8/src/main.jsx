import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CartProvider } from './context/CartContext'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'

// TODO: Add ThemeProvider untuk dark mode support
// import { ThemeProvider } from './context/ThemeContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {/* TODO: Wrap dengan ThemeProvider dan AuthProvider */}
        {/* <ThemeProvider> */}
          <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
          </AuthProvider>
        {/* </ThemeProvider> */}
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)


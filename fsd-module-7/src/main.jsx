import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './context/CartContext.jsx'

// TODO: Configure QueryClient dengan default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Data fresh for 5 minutes
      gcTime: 10 * 60 * 1000, // Cache persists 10 minutes (gcTime replaces cacheTime in v5)
      retry: 3, // Retry failed requests 3 times
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
    },
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* TODO: Wrap dengan BrowserRouter untuk routing */}
    {/* TODO: Wrap dengan QueryClientProvider untuk React Query */}
    {/* TODO: Add ReactQueryDevtools untuk debugging */}
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
      <App />
      </CartProvider>
    </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)


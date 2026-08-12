/**
 * App Component
 * 
 * TODO untuk peserta:
 * 1. Import Routes, Route dari 'react-router-dom'
 * 2. Import Layout dari 'antd'
 * 3. Import providers (ThemeProvider, AuthProvider, CartProvider)
 * 4. Import components (Navbar, Footer, AIChatbot, ProtectedRoute)
 * 5. Import all pages (11 pages)
 * 6. Create App component:
 *    - Wrap dengan providers
 *    - Render Layout dengan Navbar & Footer
 *    - Setup Routes:
 *      - Public: /, /products, /products/:id, /login, /register
 *      - Protected: /cart, /checkout, /profile, /orders, /orders/:orderId, /order-success
 *    - Render AIChatbot
 * 
 * Reference: ../finished-project/src/App.jsx
 */

// TODO: Import dependencies
// import { Routes, Route } from 'react-router-dom';
// import { Layout } from 'antd';
// import { ThemeProvider } from './context/ThemeContext';
// import { AuthProvider } from './context/AuthContext';
// import { CartProvider } from './context/CartContext';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import AIChatbot from './components/AIChatbot';
// import ProtectedRoute from './components/ProtectedRoute';
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import { CartProvider } from './context/CartContext' 
import Navbar from "./components/Navbar";

// TODO: Import pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
// import ProductDetailPage from './pages/ProductDetailPage';
// import CartPage from './pages/CartPage';
// import CheckoutPage from './pages/CheckoutPage';
// import OrderSuccessPage from './pages/OrderSuccessPage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import ProfilePage from './pages/ProfilePage';
// import OrderHistoryPage from './pages/OrderHistoryPage';
// import OrderDetailPage from './pages/OrderDetailPage';

// TODO: Create App component
// function App() {
//   // State untuk chatbot visibility
//   // Wrap dengan providers
//   // Setup routes
//   // Return JSX
// }


// TODO: Export
// export default App;

// Minimal App component untuk starter (akan diganti dengan implementasi lengkap)
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Health E-Commerce - Starter Project
        </h1>
        <p className="text-gray-600 mb-6">
          Ini adalah starter template untuk belajar. Silakan implementasikan App component sesuai dengan TODO comments di file ini.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
          <h2 className="font-semibold text-blue-800 mb-2">Langkah selanjutnya:</h2>
          <ol className="list-decimal list-inside space-y-2 text-blue-700 text-sm">
            <li>Buka file <code className="bg-blue-100 px-2 py-1 rounded">src/App.jsx</code></li>
            <li>Ikuti TODO comments untuk implementasi</li>
            <li>Lihat <code className="bg-blue-100 px-2 py-1 rounded">../finished-project/src/App.jsx</code> sebagai reference</li>
            <li>Setup routes, providers, dan components sesuai kebutuhan</li>
          </ol>
        </div>
        <p className="text-sm text-gray-500 mt-6">
          Baca README.md untuk instruksi lengkap
        </p>
      </div> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        
      </Routes>
    </div>
  );
}

export default App;


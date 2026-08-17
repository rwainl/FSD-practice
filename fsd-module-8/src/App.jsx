// TODO: Import dependencies
// import { ThemeProvider } from './context/ThemeContext';
// import Footer from './components/Footer';
// import AIChatbot from './components/AIChatbot';
// import ProtectedRoute from './components/ProtectedRoute';
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import { CartProvider } from './context/CartContext' 
import Navbar from "./components/Navbar";
import { AuthProvider } from './context/AuthContext'

// TODO: Import pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
// import OrderSuccessPage from './pages/OrderSuccessPage';
import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import ProfilePage from './pages/ProfilePage';
// import OrderHistoryPage from './pages/OrderHistoryPage';
// import OrderDetailPage from './pages/OrderDetailPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;


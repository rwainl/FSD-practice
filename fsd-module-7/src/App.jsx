import { Routes, Route } from "react-router-dom";

// TODO: Import all pages
import Navbar from "./components/Navbar";
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
// import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
// import LoginPage from './pages/LoginPage'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* TODO: Add Navbar component */}

      {/* TODO: Setup routes dengan React Router */}
      {/* Hint: 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      */}

      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;

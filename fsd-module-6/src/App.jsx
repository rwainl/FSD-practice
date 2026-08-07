/**
 * Health E-Commerce - Main App Component
 *
 * TODO untuk Peserta:
 * 1. Import useState dan useEffect dari React
 * 2. Import axios untuk API calls
 * 3. Import components (ProductCard, SearchBar, CategoryFilter)
 * 4. Setup state untuk products, loading, error
 * 5. Fetch products dari backend (localhost:5000) saat component mount
 * 6. Implement category filter logic
 * 7. Implement search functionality
 * 8. Render products dalam responsive grid
 */

import { useState, useEffect } from "react";
import axios from 'axios';

// TODO: Import components
import ProductCard from './components/ProductCard';
import CategoryFilter from "./components/CategoryFilter";
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async() => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data.data);
        setFilteredProducts(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    if(selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(p => p.category === selectedCategory),
      )
    }
  }, [selectedCategory, products]);

  const handleSearch = async(keyword) => {
    if(!keyword.trim()) {
      setFilteredProducts(products);
    }

    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/products?search=${keyword}`);
      setFilteredProducts(response.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchProducts} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Health E-Commerce
          </h1>
          <p className="text-gray-600 mt-1">
            Produk kesehatan terlengkap dan terpercaya
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* TODO: Render components here */}
        <SearchBar onSearch={handleSearch} />
        <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </main>
      <footer className="bg-white mt-12 border-t">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600">
          <p>Built with React + Vite + TailwindCSS</p>
          <p className="text-sm mt-1">
            © 2025 Health E-Commerce
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

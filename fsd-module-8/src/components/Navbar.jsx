/**
 * Navbar Component
 * 
 * TODO untuk peserta:
 * 1. Import components dari Ant Design (Menu, Button, Avatar, Dropdown, Drawer)
 * 2. Import useAuth dari '../context/AuthContext'
 * 3. Import useNavigate dari 'react-router-dom'
 * 4. Create Navbar component:
 *    - Get user & isLoggedIn dari useAuth
 *    - Handle logout
 *    - Render menu items (Home, Products, Cart, Orders)
 *    - Render user menu (Profile, Logout) jika logged in
 *    - Render Login button jika not logged in
 *    - Responsive dengan Drawer untuk mobile
 * 
 * Reference: ../finished-project/src/components/Navbar.jsx
 */

// TODO: Import dependencies
// import { Menu, Button, Avatar, Dropdown, Drawer } from 'antd';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
import React from 'react'
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingCartOutlined,
  HomeOutlined,
  AppstoreOutlined,
  LoginOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import { Menu, Button, Avatar, Dropdown, Drawer, Badge } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext';

// TODO: Create Navbar component
// function Navbar() {
//   // Get user & isLoggedIn
//   // Handle logout
//   // Render menu
//   // Return JSX
// }
function Navbar() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const {cartCount} = useCart();

  return (
    <>
        <nav className='bg-white shadow-sm'>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className='flex items-center space-x-2'>
                    <span className='text-2xl font-bold text-blue-600'>
                        Health Shop
                    </span>
                    </Link>
                    <div className="flex items-center space-x-8">
                        <Link
                            to="/"
                            className={`flex items-center space-x-1 transition ${isActive("/") ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"}`}
                        >
                            <HomeOutlined />
                            <span>Home</span>
                        </Link>
                        <Link
                            to="/products"
                            className={`flex items-center space-x-1 transition ${isActive("/products") ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"}`}
                        >
                            <ProductOutlined />
                            <span>Product</span>
                        </Link>
                        <Link
                            to="/cart"
                            className={`flex items-center space-x-1 transition ${isActive("/cart") ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"}`}
                        >
                            <Badge count={cartCount} offset={[3, 0]} showZero>
                            <ShoppingCartOutlined />
                            </Badge>
                            <span className='ml-2'>Cart</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    </>
  )
}

// TODO: Export
// export default Navbar;
export default Navbar


import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingCartOutlined,
  HomeOutlined,
  AppstoreOutlined,
  LoginOutlined,
  ProductOutlined,
  UserOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { Menu, Button, Avatar, Dropdown, Drawer, Badge, Layout } from "antd";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const { Header } = Layout;

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const { getCartCount } = useCart();
  const { user, isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    message.success("Logout successful");
    navigate("/");
  };

  return (
    <>
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-blue-600">
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
                <Badge count={getCartCount} offset={[3, 0]} showZero>
                  <ShoppingCartOutlined />
                </Badge>
                <span className="ml-2">Cart</span>
              </Link>
              {isLoggedIn ? (
                <>
                <Link
                  to="/profile"
                  className={`flex items-center space-x-1 transition ${isActive("/profile") ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"}`}
                >
                  <span>{user.name}</span>
                </Link>
                <Button
                type="primary"
                onClick={() => handleLogout()}
                >
                    Logout
                </Button>
                    </>
              ) : (
                <Link
                    to="/login"
                    className={`flex items-center space-x-1 transition ${isActive("/login") ? "text-blue-600 font-semibold" : "text-gray-700"} `}
                  >
                    <LoginOutlined />
                    <span>Login</span>
                  </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

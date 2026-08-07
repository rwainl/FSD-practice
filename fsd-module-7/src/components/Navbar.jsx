// TODO: Import Link dari react-router-dom
// TODO: Import useCart dari context
// TODO: Import Badge dari antd
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  ShoppingCartOutlined,
  HomeOutlined,
  AppstoreOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";

function Navbar() {
  // TODO: Get cart count dari CartContext
  const { cartCount } = useCart();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // TODO: Create navigation links:
  // - Home (/)
  // - Products (/products)
  // - Cart (/cart) with badge showing count
  // - Login (/login)

  return (
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
              className={`flex items-center space-x-1 transition ${
                isActive("/")
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <HomeOutlined />
              <span>Home</span>
            </Link>
            <Link
              to="/products"
              className={`flex items-center space-x-1 transition ${
                isActive("/products")
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <AppstoreOutlined />
              <span>Product</span>
            </Link>
            <Link
              to="/cart"
              className={`flex items-center space-x-1 transition ${
                isActive("/cart") ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <Badge count={cartCount} offset={[3, 0]} showZero>
                <ShoppingCartOutlined className="text-xl" />
              </Badge>
              <span className="ml-2">Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

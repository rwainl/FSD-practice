import React, {useState} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingCartOutlined,
  HomeOutlined,
  AppstoreOutlined,
  LoginOutlined,
  ProductOutlined,
  UserOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  SunOutlined,
  MenuOutlined
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
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleLogout = () => {
    logout();
    message.success("Logout successful");
    navigate("/");
  };

  const userMenu = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'orders',
      icon: <ShoppingOutlined />,
      label: 'Order History',
      onClick: () => navigate('/orders'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'logout',
      onClick: handleLogout,
      danger: true,
    },
  ];

  const generalMenu = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link to="/" >Home</Link>,
    },
    {
      key: 'products',
      icon: <AppstoreOutlined />,
      label: <Link to="/products" >Products</Link>,
    },
    {
      key: 'cart',
      icon: (
        <Badge count={getCartCount} offset={[3,0]}>
          <ShoppingCartOutlined />
        </Badge>
      ),
      label: <Link to="/cart" >Cart</Link>,
    },
    ...(isLoggedIn ? [{
      key: 'orders',
      icon: <ShoppingOutlined />,
      label: <Link to='/orders' >Order History</Link>
    }] : [])
  ];

  return (
    <Header className="!flex items-center justify-between !px-4 md:!px-6 lg:!px-8 !bg-white !shadow-lg !sticky !top-0 !z-50 !h-16 !leading-none border-b border-gray-100">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2 text-base smLtext-lg md:text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors no-underline" >
          <span className="text-xl sm:text-2xl"></span>
          <span className="hidden sm:inline">Health E-Commerce</span>
          <span className="sm:hidden">Health</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <Menu 
          mode="horizontal"
          items={generalMenu}
          className="border-0 bg-transparent flex-1 min-w-0"
          selectedKeys={[]}
          style={{ lineHeight: '64px' }}
        />

        <Button 
          icon={<SunOutlined />}
          type="text"
          className="!flex items-center justify-center"
          size="middle"
        />

        {isLoggedIn ? (
          <Dropdown menu={{ items: userMenu }} placement="bottomRight">
            <Button type="text" className="!flex items-center gap-2" >
              <Avatar size="small" icon={<UserOutlined />} className="bg-blue-500" />
              <span className="hidden lg:inline">{user?.name}</span>
            </Button>
          </Dropdown>
        ) : (
          <Button
            type="primary"
            icon={<LoginOutlined />}
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        )}
      </div>

      <div className="md:hidden flex items-center space-x-2">
        <Button
          icon={<SunOutlined />}
          type="text"
        />

        <Button 
          icon={<MenuOutlined />}
          onClick={() => setDrawerVisible(true)}
          type="text"
        />

      </div>

      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Menu 
          mode="vertical"
          items={generalMenu}
          onClick={() => setDrawerVisible(false)}
        />

        {isLoggedIn ? (
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 rounded-lg mb-3">
                <Avatar icon={<UserOutlined />} className="bg-blue-500" />
                <div className="">
                  <div className="font-semibold text-gray-800">{user?.name}</div>
                  <div className="text-xs text-gray-500">{user?.email}</div>
                </div>
              </div>
                <Menu
                  mode="vertical"
                  items={userMenu}
                  onClick={() => setDrawerVisible(false)}
                />
            </div>
        ) : (
          <div className="mt-4 pt-4 border-t px-4">
            <Button
              type="primary"
              icon={<LoginOutlined />}
              onClick={() => {
                setDrawerVisible(false);
                navigate('/login');
              }}
              block
            >
              Login
            </Button>
          </div>
        )}
      </Drawer>
    </Header>
  );
}

export default Navbar;

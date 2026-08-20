import { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if(saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (error) {
        console.error(error.message);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item._id === product._id);

      if(existingItem) {
        message.success(`${product.name} Quantity +1`);
        return prev.map((item) => item._id === product._id ? {...item, quantity: item.quantity + 1} : item);
      } else {
        message.success(`${product.name} added to cart`);
        return [...prev, {...product, quantity: 1}];
      }
    })
  };

  const removeFromCart = (productId) => {
    
    setCart((prev) => prev.filter((item) => item._id !== productId));
    message.info('Product removed from cart');
  };

  const updateQuantity = (productId, quantity) => {
    if(quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prev) => prev.map((item) => item._id === productId ? {...item, quantity} : item));
  };

  const clearCart = () => {
    setCart([]);
    message.success('Cart cleared');
  };

  const getCartTotal = cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  const getCartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
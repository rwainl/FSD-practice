import { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';

const CartContext = createContext();

export function CartProvider({ children }) {
  // TODO: State untuk cart items (array of products)
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if(savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error(error.message);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  // TODO: Function addToCart(product)
  // Hint: Check if product already in cart
  //       If yes, increase quantity
  //       If no, add to cart with quantity 1
  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item._id === product._id);

      if(existingItem) {
        message.success(`${product.name} Quantity +1`);
        return prev.map((item) => 
          item._id === product._id ? {...item, quantity: item.quantity + 1} : item
        );
      } else {
        message.success(`${product.name} added to cart`);
        return [...prev, {...product, quantity: 1}];
      }
    })
  };
  
  // TODO: Function removeFromCart(productId)
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item._id !== productId));
    message.info('Product removed from cart');
  }
  
  // TODO: Function updateQuantity(productId, quantity)
  const updateQuantity = (productId, quantity) => {
    if(quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prev) => 
      prev.map((item) => 
        item._id === productId ? {...item, quantity} : item,
      )
    )
  };

  const clearCart = () => {
    setCart([]);
    message.success('Cart cleared!');
  };
  
  // TODO: Calculate cartTotal (sum of all items)
  const cartTotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  
  // TODO: Calculate cartCount (total items in cart)
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}


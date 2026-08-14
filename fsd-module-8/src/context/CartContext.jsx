/**
 * Cart Context (STARTER)
 * TODO: Complete the shopping cart implementation
 * 
 * Learning objectives:
 * - Manage shopping cart state dengan Context API
 * - Persist cart data di localStorage
 * - Implement CRUD operations untuk cart items
 */

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
  // TODO 1: Initialize cart state dari localStorage
  // const [cart, setCart] = useState(() => {
  //   // TODO: Load cart from localStorage
  //   // TODO: Parse JSON atau return empty array jika tidak ada
    
  //   // HINT: const saved = localStorage.getItem('cart');
  //   // HINT: return saved ? JSON.parse(saved) : [];
  //     const saved = localStorage.getItem('cart');
  //     if(saved) {
  //       try {
  //         return JSON.parse(saved);
  //       } catch (error) {
  //         console.error(error.message);
  //       }
  //     }
  //     return [];
  // });
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

  // TODO 2: Save cart to localStorage setiap cart changes
  useEffect(() => {
    // TODO: Save cart to localStorage as JSON string
    
    // HINT: localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // TODO 3: Implement addToCart function
  const addToCart = (product) => {
    // TODO: Check if product already in cart
    // TODO: If yes, increment quantity
    // TODO: If no, add new item dengan quantity 1
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

  // TODO 4: Implement removeFromCart function
  const removeFromCart = (productId) => {
    // TODO: Filter out product dengan matching ID
    
    setCart((prev) => prev.filter((item) => item._id !== productId));
    message.info('Product removed from cart');
  };

  // TODO 5: Implement updateQuantity function
  const updateQuantity = (productId, quantity) => {
    // TODO: If quantity <= 0, remove item
    // TODO: Otherwise, update quantity
    
    if(quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prev) => prev.map((item) => item._id === productId ? {...item, quantity} : item));
  };

  // TODO 6: Implement clearCart function
  const clearCart = () => {
    // TODO: Set cart to empty array
    setCart([]);
    message.success('Cart cleared');
  };

  // TODO 7: Implement getCartTotal function
  const getCartTotal = () => {
    // TODO: Calculate total price (sum of price * quantity untuk all items)
    return cart.reduce((total, item) => {
      return total + (item.price * item.quantity); 
    }, 0);
  };

  // TODO 8: Implement getCartCount function
  const getCartCount = () => {
    // TODO: Count total items (sum of all quantities)
    return cart.reduce((count, item) => {
      return count + item.quantity, 0
    })
  };

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

// ==========================================
// USAGE EXAMPLE
// ==========================================

/*
// In main.jsx:
<CartProvider>
  <App />
</CartProvider>

// In any component:
import { useCart } from './context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  
  return (
    <button onClick={() => addToCart(product)}>
      Add to Cart
    </button>
  );
}

function CartPage() {
  const { cart, getCartTotal } = useCart();
  
  return (
    <div>
      <h1>Total: Rp {getCartTotal().toLocaleString('id-ID')}</h1>
      {cart.map(item => (
        <div key={item._id}>{item.name} x {item.quantity}</div>
      ))}
    </div>
  );
}

NEXT STEPS:
1. Complete TODOs 1-8
2. Add CartProvider to main.jsx
3. Use useCart in ProductCard untuk add to cart
4. Use useCart in CartPage untuk display items
5. Test cart persists after reload
6. Compare dengan finished-project
*/


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
  const [cart, setCart] = useState(() => {
    // TODO: Load cart from localStorage
    // TODO: Parse JSON atau return empty array jika tidak ada
    
    // HINT: const saved = localStorage.getItem('cart');
    // HINT: return saved ? JSON.parse(saved) : [];
  });

  // TODO 2: Save cart to localStorage setiap cart changes
  useEffect(() => {
    // TODO: Save cart to localStorage as JSON string
    
    // HINT: localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // TODO 3: Implement addToCart function
  const addToCart = (product) => {
    // TODO: Check if product already in cart
    // TODO: If yes, increment quantity
    // TODO: If no, add new item dengan quantity 1
    
    // HINT: setCart((prevCart) => {
    // HINT:   const existing = prevCart.find(item => item._id === product._id);
    // HINT:   if (existing) {
    // HINT:     return prevCart.map(item =>
    // HINT:       item._id === product._id
    // HINT:         ? { ...item, quantity: item.quantity + 1 }
    // HINT:         : item
    // HINT:     );
    // HINT:   }
    // HINT:   return [...prevCart, { ...product, quantity: 1 }];
    // HINT: });
  };

  // TODO 4: Implement removeFromCart function
  const removeFromCart = (productId) => {
    // TODO: Filter out product dengan matching ID
    
    // HINT: setCart(prevCart => prevCart.filter(item => item._id !== productId));
  };

  // TODO 5: Implement updateQuantity function
  const updateQuantity = (productId, quantity) => {
    // TODO: If quantity <= 0, remove item
    // TODO: Otherwise, update quantity
    
    // HINT: if (quantity <= 0) {
    // HINT:   removeFromCart(productId);
    // HINT:   return;
    // HINT: }
  };

  // TODO 6: Implement clearCart function
  const clearCart = () => {
    // TODO: Set cart to empty array
  };

  // TODO 7: Implement getCartTotal function
  const getCartTotal = () => {
    // TODO: Calculate total price (sum of price * quantity untuk all items)
    
    // HINT: return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // TODO 8: Implement getCartCount function
  const getCartCount = () => {
    // TODO: Count total items (sum of all quantities)
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


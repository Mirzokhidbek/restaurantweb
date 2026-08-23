/**
 * FAZO Restorani Namangan - Shopping Cart Context Provider
 * 
 * Clean Code Architecture Principles:
 * - Centralized Shopping Cart State Management.
 * - Automatic State Persistence: Synchronizes cart items with localStorage (`fazo_restaurant_cart`).
 * - Automatic Delivery Fee Calculation: Free delivery for orders >= 150,000 So'm.
 * - Global Toast Notification Integration on Cart Actions.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { toast } = useToast();

  // Lazy initialization of cart state from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('fazo_restaurant_cart');
      if (!savedCart) return [];
      const parsed = JSON.parse(savedCart);
      if (!Array.isArray(parsed)) return [];

      return parsed.map((item) => {
        const prod = item.product || item;
        return {
          _id: prod._id || item._id || String(Math.random()),
          name: prod.name || item.name || 'Taom',
          price: Number(prod.price || item.price || 0),
          image: prod.image || item.image || '',
          quantity: Number(item.quantity || 1),
          product: prod,
        };
      });
    } catch (e) {
      console.error('Failed to parse cart from localStorage:', e);
      return [];
    }
  });

  // Synchronize cart state with localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('fazo_restaurant_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cartItems]);

  /**
   * Add item to cart or increment quantity if already present
   * @param {Object} product - Dish object
   * @param {number} quantity - Quantity to add (default 1)
   */
  const addToCart = (product, quantity = 1) => {
    if (!product || (!product._id && !product.id)) return;
    const productId = product._id || product.id;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item._id === productId);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        const newItem = {
          _id: productId,
          name: product.name || 'Taom',
          price: Number(product.price || 0),
          image: product.image || '',
          quantity: Number(quantity),
          product: product,
        };
        return [...prevItems, newItem];
      }
    });

    toast.success(`"${product.name || 'Taom'}" savatchaga muvaffaqiyatli qo‘shildi!`, '🛒 Savatga Qo‘shildi');
  };

  /**
   * Remove item from cart by ID
   * @param {string} productId - Product ObjectId
   */
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
    toast.info('Taom savatdan olib tashlandi.', '🗑️ Olib Tashlandi');
  };

  /**
   * Update item quantity in cart
   * @param {string} productId - Product ObjectId
   * @param {number} quantity - New target quantity
   */
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId ? { ...item, quantity: Number(quantity) } : item
      )
    );
  };

  /**
   * Clear all items from cart
   */
  const clearCart = () => {
    setCartItems([]);
  };

  // Mathematical Aggregations
  const totalItems = cartItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  // Free delivery for orders >= 150,000 So'm
  const deliveryFee = subtotal > 0 ? (subtotal >= 150000 ? 0 : 15000) : 0;

  const totalPrice = subtotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cart: cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        deliveryFee,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

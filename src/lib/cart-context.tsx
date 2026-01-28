'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { CartItem, Cart } from './types';

interface CartContextType {
  cart: Cart;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (cartItemKey: string) => void;
  updateQuantity: (cartItemKey: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = '3d-print-store-cart';

// Generate a unique key for cart items based on product ID and variants
export function getCartItemKey(item: { productId: string; selectedColor?: string; selectedSize?: string }): string {
  return `${item.productId}|${item.selectedColor || ''}|${item.selectedSize || ''}`;
}

function calculateTotals(items: CartItem[]): { totalItems: number; totalPrice: number } {
  return items.reduce(
    (acc, item) => ({
      totalItems: acc.totalItems + item.quantity,
      totalPrice: acc.totalPrice + item.price * item.quantity,
    }),
    { totalItems: 0, totalPrice: 0 }
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({ items: [], totalItems: 0, totalPrice: 0 });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        const totals = calculateTotals(parsed.items || []);
        setCart({ items: parsed.items || [], ...totals });
      } catch {
        // Invalid cart data, start fresh
      }
    }
    setIsInitialized(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setCart((prev) => {
      const itemKey = getCartItemKey(item);
      const existingIndex = prev.items.findIndex(
        (i) => getCartItemKey(i) === itemKey
      );
      
      let newItems: CartItem[];
      if (existingIndex >= 0) {
        // Update existing item quantity
        newItems = prev.items.map((i, index) =>
          index === existingIndex
            ? { ...i, quantity: Math.min(i.quantity + quantity, i.stockQuantity) }
            : i
        );
      } else {
        // Add new item
        newItems = [...prev.items, { ...item, quantity }];
      }

      const totals = calculateTotals(newItems);
      return { items: newItems, ...totals };
    });
    setIsCartOpen(true);
  }, []);

  const removeItem = useCallback((cartItemKey: string) => {
    setCart((prev) => {
      const newItems = prev.items.filter((item) => getCartItemKey(item) !== cartItemKey);
      const totals = calculateTotals(newItems);
      return { items: newItems, ...totals };
    });
  }, []);

  const updateQuantity = useCallback((cartItemKey: string, quantity: number) => {
    if (quantity < 1) return;

    setCart((prev) => {
      const newItems = prev.items.map((item) =>
        getCartItemKey(item) === cartItemKey
          ? { ...item, quantity: Math.min(quantity, item.stockQuantity) }
          : item
      );
      const totals = calculateTotals(newItems);
      return { items: newItems, ...totals };
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart({ items: [], totalItems: 0, totalPrice: 0 });
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

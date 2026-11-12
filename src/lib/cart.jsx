import { createContext, useContext, useState, useCallback } from 'react';
import useSessionCart from '@/components/checkout/useSessionCart';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useSessionCart();
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product_id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product_id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          product_id: product.id,
          product_name: product.name,
          product_image: product.image_url,
          price: product.price,
          quantity,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.product_id !== productId));
  }, []);

  const updateQty = useCallback((productId, qty) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.product_id !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.product_id === productId ? { ...i, quantity: qty } : i))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, isOpen, setIsOpen, addItem, removeItem, updateQty, clear, count, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
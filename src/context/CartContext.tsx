import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Pizza } from '../types';

interface CartItem {
  pizzaId: string;
  pizzaName: string;
  price: number;
  quantity: number;
}

interface CartState {
  isOpen: boolean;
  items: CartItem[];
}

interface CartContextType {
  state: CartState;
  toggleCart: () => void;
  closeCart: () => void;
  addItem: (pizza: Pizza) => void;
  removeItem: (pizzaId: string) => void;
  updateQuantity: (pizzaId: string, quantity: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CartState>({ isOpen: false, items: [] });

  const toggleCart = () => setState(s => ({ ...s, isOpen: !s.isOpen }));
  const closeCart = () => setState(s => ({ ...s, isOpen: false }));

  const addItem = (pizza: Pizza) => {
    setState(s => {
      const existing = s.items.find(i => i.pizzaId === pizza.id);
      if (existing) {
        return {
          ...s,
          items: s.items.map(i =>
            i.pizzaId === pizza.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        ...s,
        items: [...s.items, { pizzaId: pizza.id, pizzaName: pizza.name, price: pizza.price, quantity: 1 }],
      };
    });
  };

  const removeItem = (pizzaId: string) => {
    setState(s => ({ ...s, items: s.items.filter(i => i.pizzaId !== pizzaId) }));
  };

  const updateQuantity = (pizzaId: string, quantity: number) => {
    setState(s => ({
      ...s,
      items: s.items.map(i =>
        i.pizzaId === pizzaId ? { ...i, quantity: Math.max(1, quantity) } : i
      ),
    }));
  };

  const getTotalItems = () => state.items.reduce((sum, i) => sum + i.quantity, 0);
  const getTotalPrice = () => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ state, toggleCart, closeCart, addItem, removeItem, updateQuantity, getTotalItems, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Cart Item Interface
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

// Cart State Interface
interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Cart Action Types
type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

// Cart Context Interface
interface CartContextType {
  state: CartState;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getItemQuantity: (id: string) => number;
}

// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => 
        item.id === action.payload.id && 
        item.selectedSize === action.payload.selectedSize &&
        item.selectedColor === action.payload.selectedColor
      );

      if (existingItem) {
        // Update quantity if item already exists
        const updatedItems = state.items.map(item =>
          item.id === existingItem.id && 
          item.selectedSize === existingItem.selectedSize &&
          item.selectedColor === existingItem.selectedColor
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );

        const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const newItemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);

        return {
          ...state,
          items: updatedItems,
          total: newTotal,
          itemCount: newItemCount
        };
      } else {
        // Add new item
        const newItems = [...state.items, action.payload];
        const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

        return {
          ...state,
          items: newItems,
          total: newTotal,
          itemCount: newItemCount
        };
      }
    }

    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const newItemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        items: updatedItems,
        total: newTotal,
        itemCount: newItemCount
      };
    }

    case 'REMOVE_ITEM': {
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      const newTotal = filteredItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const newItemCount = filteredItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        items: filteredItems,
        total: newTotal,
        itemCount: newItemCount
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0
      };

    case 'LOAD_CART':
      const newTotal = action.payload.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const newItemCount = action.payload.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        items: action.payload,
        total: newTotal,
        itemCount: newItemCount
      };

    default:
      return state;
  }
};

// Cart Provider Component
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  // Cart Actions
  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const cartItem: CartItem = {
      ...item,
      id: `${item.name}-${item.selectedSize}-${item.selectedColor}-${Date.now()}`
    };
    dispatch({ type: 'ADD_ITEM', payload: cartItem });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemQuantity = (id: string): number => {
    const item = state.items.find(item => item.id === id);
    return item ? item.quantity : 0;
  };

  const value: CartContextType = {
    state,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to use Cart Context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 
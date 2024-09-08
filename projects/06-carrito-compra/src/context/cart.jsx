import { createContext, useReducer, useState } from "react";
import { cartReducer, cartInitialState } from "../reducers/cart";

// 1. Crear contexto
export const CartContext = createContext();

function useCartReducer() {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: product });
  };

  const cleanCart = () => {
    dispatch({ type: "CLEAN_CART" });
  };

  return { state, addToCart, removeFromCart, cleanCart };
}

// 2. Crear provider
export function CartProvider({ children }) {
  const { state, addToCart, removeFromCart, cleanCart } = useCartReducer();

  return (
    <CartContext.Provider
      value={{ cart: state, addToCart, removeFromCart, cleanCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

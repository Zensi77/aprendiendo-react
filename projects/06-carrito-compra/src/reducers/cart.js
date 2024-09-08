export const cartInitialState =
  JSON.parse(window.localStorage.getItem("cart")) || []; // Inicializar el estado del carrito

export const CART_ACTIONS_TYPES = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CLEAN_CART: "CLEAN_CART",
};

export const updateLocalStorage = (cart) => {
  window.localStorage.setItem("cart", JSON.stringify(cart));
};

export const cartReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action; // Desestructurar la acción en tipo y carga útil

  switch (action.type) {
    case CART_ACTIONS_TYPES.ADD_TO_CART: {
      const { id } = actionPayload;
      const productInCartIndex = state.findIndex((item) => item.id === id);

      if (productInCartIndex >= 0) {
        const newState = structuredClone(state);
        newState[productInCartIndex].quantity += 1;
        updateLocalStorage(newState);
        return newState;
      }

      const newState = [...state, { ...actionPayload, quantity: 1 }];

      updateLocalStorage(newState);
      return [...state, { ...actionPayload, quantity: 1 }];
    }

    case CART_ACTIONS_TYPES.REMOVE_FROM_CART: {
      const { id } = actionPayload;
      const newState = state.filter((item) => item.id !== id);
      updateLocalStorage(newState);
      return newState;
    }

    case CART_ACTIONS_TYPES.CLEAN_CART: {
      updateLocalStorage([]);
      return [];
    }
  }
  return state;
};

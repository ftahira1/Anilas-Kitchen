import React, { createContext, useContext, useReducer } from "react";
import { reducer } from './reducers'

const StoreContext = createContext();
const { Provider } = StoreContext;

export function useMealReducer(initialState) {
  return useReducer(reducer, initialState)
}

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useMealReducer({
    meals: [],
    cart: [],
    cartOpen: false,
    menues: [],
    currentMenu: '',
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };

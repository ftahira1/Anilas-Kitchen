import {
    UPDATE_MEALS,
    ADD_TO_CART,
    UPDATE_CART_QUANTITY,
    REMOVE_FROM_CART,
    ADD_MULTIPLE_TO_CART,
    UPDATE_MENUES,
    UPDATE_CURRENT_MENU,
    CLEAR_CART,
    TOGGLE_CART
  } from "./actions";
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case UPDATE_MEALS:
        return {
          ...state,
          meals: [...action.meals],
        };
  
      case ADD_TO_CART:
        return {
          ...state,
          cartOpen: true,
          cart: [...state.cart, action.meal],
        };
  
      case ADD_MULTIPLE_TO_CART:
        return {
          ...state,
          cart: [...state.cart, ...action.meals],
        };
  
      case UPDATE_CART_QUANTITY:
        return {
          ...state,
          cartOpen: true,
          cart: state.cart.map(meal => {
            if (action._id === meal._id) {
              meal.purchaseQuantity = action.purchaseQuantity
            }
            return meal
          })
        };
  
      case REMOVE_FROM_CART:
        let newState = state.cart.filter(meal => {
          return meal._id !== action._id;
        });
  
        return {
          ...state,
          cartOpen: newState.length > 0,
          cart: newState
        };
  
      case CLEAR_CART:
        return {
          ...state,
          cartOpen: false,
          cart: []
        };
  
      case TOGGLE_CART:
        return {
          ...state,
          cartOpen: !state.cartOpen
        };
  
      case UPDATE_MENUES:
        return {
          ...state,
          menues: [...action.menues],
        };
  
      case UPDATE_CURRENT_MENU:
        return {
          ...state,
          currentMenu: action.currentMenu
        }
  
      default:
        return state;
    }
  };
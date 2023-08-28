import {
    UPDATE_MEALS,
    ADD_TO_LIST,
    UPDATE_LIST_QUANTITY,
    REMOVE_FROM_LIST,
    ADD_MULTIPLE_TO_LIST,
    UPDATE_MENUES,
    UPDATE_CURRENT_MENU,
    CLEAR_LIST,
    TOGGLE_LIST
  } from "./actions";
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case UPDATE_MEALS:
        return {
          ...state,
          meals: [...action.meals],
        };
  
      case ADD_TO_LIST:
        return {
          ...state,
          listOpen: true,
          list: [...state.list, action.meal],
        };
  
      case ADD_MULTIPLE_TO_LIST:
        return {
          ...state,
          list: [...state.list, ...action.meals],
        };
  
      case UPDATE_LIST_QUANTITY:
        return {
          ...state,
          listOpen: true,
          list: state.list.map(meal => {
            if (action._id === meal._id) {
              meal.purchaseQuantity = action.purchaseQuantity
            }
            return meal
          })
        };
  
      case REMOVE_FROM_LIST:
        let newState = state.list.filter(meal => {
          return meal._id !== action._id;
        });
  
        return {
          ...state,
          listOpen: newState.length > 0,
          list: newState
        };
  
      case CLEAR_LIST:
        return {
          ...state,
          listOpen: false,
          list: []
        };
  
      case TOGGLE_LIST:
        return {
          ...state,
          listOpen: !state.listOpen
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
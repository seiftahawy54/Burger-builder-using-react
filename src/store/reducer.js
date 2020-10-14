import * as actionTypes from "./actions";

// Price of each ingredient
const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
};

const Reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.value]: state.ingredients[action.value] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.value]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.value]: state.ingredients[action.value] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.value]
      };
      default:
        return state;
    }
};

export default Reducer;

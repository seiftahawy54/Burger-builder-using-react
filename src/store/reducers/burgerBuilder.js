import * as actionTypes from '../actions/actionTypes';

// Price of each ingredient
const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
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
      case actionTypes.SET_INGREDIENTS:
        return {
          ...state,
          ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
          },
          error: false
        };
      case actionTypes.FETCH_INGREDIENTS_FAILED:
        return {
          ...state,
          error: true
        };
      default:
        return state;
    }
};

export default Reducer;

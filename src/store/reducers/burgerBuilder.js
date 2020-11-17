import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../shared/utility';

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

const addIngredient = (state, action) => {
  const updatedIngredient = {[action.value]: state.ingredients[action.value] + 1};
  const updatedIngredients = updatedObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.value],
    building: true
  };

  return updatedObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIng = {[action.value]: state.ingredients[action.value] - 1};
  const updatedIngs = updatedObject(state.ingredients, updatedIng);
  const updatedSt = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.value],
    building: true
  };  
  return updatedObject(state, updatedSt);
};

const setIngredients = (state, action) => {
  return updatedObject(state, {ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: 4,
    error: false,
    building: false
  });
};

const fetchIngredientsFailed = (state, action) => {
  return updatedObject(state, {error: true});
};

const Reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);

    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
      
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
     
    default: return state;
    }
};

export default Reducer;

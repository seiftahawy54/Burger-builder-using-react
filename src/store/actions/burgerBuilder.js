import * as actionTypes from './actionTypes';
// Axios import => to import the handler to send burgers to DB.
import axios from "../../axios-orders";

export const addIngredient = (value) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    value
  };
};

export const removeIngredient = (value) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    value
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios
      .get("https://myburger-react-app-d2016.firebaseio.com/ingredients.json")
      .then((res) => {
        dispatch(setIngredients(res.data));
      })
      .catch((err) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
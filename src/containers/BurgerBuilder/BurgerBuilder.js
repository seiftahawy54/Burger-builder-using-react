import React, { useState, useEffect, useCallback } from "react";
// Importing connect HOC to add the component to global state.
import { connect, useDispatch, useSelector } from "react-redux";

/* Pux component */
import Pux from "../../hoc/Pux/Pux";

// Burger Ingredient && Burger Component To render
import Burger from "../../components/Burger/Burger";
// BuildControls import => responsible for controlling the adding and deleting ingredients.
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
// Modal import => responsible for gathering navbar components in one place.
import Modal from "../../components/UI/Modal/Modal";
// Order Summary => Setup the orders amounts and process to checkout
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
// Axios import => to import the handler to send burgers to DB.
import axios from "../../axios-orders";
// Importing spinner
import Spinner from "../../components/UI/Spinner/Spinner";
// Importing withErrorHandler
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
// Importing action types
import * as actions from "../../store/actions/index";

export const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();

  const ings = useSelector((state) => {
    return state.burgerBuilder.ingredients;
  });
  const price = useSelector((state) => {
    return state.burgerBuilder.totalPrice;
  });
  const error = useSelector((state) => {
    return state.burgerBuilder.error;
  });
  const isAuthenticated = useSelector((state) => {
    return state.auth.token !== null;
  });

  const onAddIngredient = (ingName) => dispatch(actions.addIngredient(ingName));

  const onInitPurchase = () => dispatch(actions.purchaseInit());

  const onRemoveIngredient = (ingName) =>
    dispatch(actions.removeIngredient(ingName));

  const onInitIngredient = useCallback(
    () => dispatch(actions.initIngredients()),
    []
  );

  const onSetAuthRedirectPath = (path) =>
    dispatch(actions.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredient();
  }, [onInitIngredient]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => el + sum, 0);

    return sum > 0;
  };

  const purchasingHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push("/checkout");
  };

  let orderSummary = null;
  let burger = error ? <p>Ingredients can't beloaded</p> : <Spinner />;

  const disabledInfo = {
    ...ings,
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  if (ings) {
    burger = (
      <Pux>
        <Burger ingredients={ings} />
        <BuildControls
          ingredientAdded={onAddIngredient}
          ingredientRemoved={onRemoveIngredient}
          disabled={disabledInfo}
          price={price}
          isOrdered={purchasingHandler}
          purchasable={updatePurchaseState(ings)}
          isAuth={isAuthenticated}
        />
      </Pux>
    );

    orderSummary = (
      <OrderSummary
        ingredients={ings}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        price={price}
      />
    );
  }

  return (
    <Pux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Pux>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingName) => dispatch(actions.addIngredient(ingName)),
    onRemoveIngredient: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredient: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));

import React, { Component } from "react";
// Importing connect HOC to add the component to global state.
import { connect } from 'react-redux';

/* Aux component */
import Aux from "../../hoc/Aux/Aux";

// Burger Ingredient && Burger Component To render
import Burger from "../../components/Burger/Burger";
// BuildControls import => responsible for controlling the adding and deleting ingredients.
import BuilderContorls from "../../components/Burger/BuildControls/BuildControls";
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
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => el + sum, 0);

    return sum > 0;
  };

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  componentDidMount = () => {
    // axios
    //   .get("https://myburger-react-app-d2016.firebaseio.com/ingredients.json")
    //   .then((res) => {
    //     this.setState({
    //       ingredients: res.data,
    //     });
    //   })
    //   .catch((err) => {
    //     this.setState({ error: true });
    //   });
  };

  render() {
    window.comProp = this.props;
    window.state = this.state;
    
    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can't beloaded</p>
    ) : (
      <Spinner />
    );

    const disabledInfo = {
      ...this.props.ings,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuilderContorls
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemoved={this.props.onRemoveIngredient}
            disabled={disabledInfo}
            price={this.props.price}
            isOrdered={this.purchasingHandler}
            purchasable={this.updatePurchaseState(this.props.ings)}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, value: ingName}),
    onRemoveIngredient: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, value: ingName}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

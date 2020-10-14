// MAIN REACT LIBRARY and component important stuff
import React, { Component } from "react";

// Import the checkout component summary file to view the
// summary of the order to user.
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

// Import Route to nest the form to this route.
import { Route } from "react-router-dom";

import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0,
  };

  UNSAFE_componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    /*
    ** my solution
    ** what i see wrong here is that i update the state each time i loop.
    ** but in Max's solution we update the state only once.
    for (let param of query.entries()) {
      let ingredient = param[0];
      let value = +param[1];
      this.setState({
        ingredients : {
          ingredient: value
        }
      });
    }*/

    let ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }

    this.setState({
      ingredients: ingredients,
      totalPrice: price,
    });

    console.log(this.state);
  }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancel={this.checkoutCancelHandler}
          checkoutContinue={this.checkoutContinueHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />}
        />
      </div>
    );
  }
}

export default Checkout;
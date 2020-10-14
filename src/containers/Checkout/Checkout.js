// MAIN REACT LIBRARY and component important stuff
import React, { Component } from "react";

// Import the checkout component summary file to view the
// summary of the order to user.
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

// Import Route to nest the form to this route.
import { Route } from "react-router-dom";
// Importing contact data to view the form
import ContactData from "./ContactData/ContactData";
// Importing connect HOC to add the component to global state.
import { connect } from 'react-redux';

class Checkout extends Component {
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
          ingredients={this.props.ings}
          checkoutCancel={this.checkoutCancelHandler}
          checkoutContinue={this.checkoutContinueHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients
  };
};

export default  connect(mapStateToProps)(Checkout);
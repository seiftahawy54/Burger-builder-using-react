// MAIN REACT LIBRARY and component important stuff
import React from "react";

// Import the checkout component summary file to view the
// summary of the order to user.
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

// Import Route to nest the form to this route.
import {Route, Redirect} from "react-router-dom";
// Importing contact data to view the form
import ContactData from "./ContactData/ContactData";
// Importing connect HOC to add the component to global state.
import {connect} from 'react-redux';

const Checkout = props => {

  const checkoutCancelHandler = () => {
    props.history.goBack();
  };

  const checkoutContinueHandler = () => {
    props.history.replace("/checkout/contact-data");
  };


  let summary = <Redirect to="/"/>;
  if (props.ings) {
    const purchasedRedirect = props.purchased ? <Redirect to=""/> : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ings}
          checkoutCancel={checkoutCancelHandler}
          checkoutContinue={checkoutContinueHandler}
        />
        <Route
          path={props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );


    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
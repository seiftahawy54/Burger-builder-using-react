// Importing main react library with its things
import React, { Component } from "react";
import classes from "./ContactData.module.css";
// Importing connect HOC to add the component to global state.
import { connect } from "react-redux";

// Importing button shape
import Button from "../../../components/UI/Button/Button";
// Axios import => to import the handler to send burgers to DB.
import axios from "../../../axios-orders";
// Importing spinner component
import Spinner from "../../../components/UI/Spinner/Spinner";
// Importing custom input component
import Input from "../../../components/UI/Input/Input";
// Object Maker
import ObjectMaker from "../../../hoc/ObjectMaker/ObjectMaker";
// Import WithErrorHandler HOC.
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
// Import index file which holds the reference to all actions
import * as orderingActions from '../../../store/actions/index';
// Import Utility function to updating objects.
import { updatedObject, checkValidation } from '../../../shared/utility';

class ContactData extends Component {
  state = {
    orderForm: {
      name: ObjectMaker(
        "input",
        { type: "text", placeholder: "Your Name" },
        "",
        { required: true },
        false,
        false
      ),
      street: ObjectMaker(
        "input",
        { type: "text", placeholder: "Street" },
        "",
        { required: true },
        false,
        false
      ),
      zipCode: ObjectMaker(
        "input",
        { type: "text", placeholder: "ZIP Code" },
        "",
        { required: true, minLength: 5, maxLength: 5 },
        false,
        false
      ),
      country: ObjectMaker(
        "input",
        { type: "text", placeholder: "Country" },
        "",
        { required: true },
        false,
        false
      ),
      email: ObjectMaker(
        "input",
        { type: "email", placeholder: "Your Email" },
        "",
        { required: true },
        false,
        false
      ),
      deliveryMethod: ObjectMaker(
        "select",
        {
          options: [
            { value: "fastest", display: "Fastest" },
            { value: "cheapest", display: "Cheapest" },
          ],
        },
        "Fastest",
        {},
        false,
        false
      ),
    },
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    };

    this.props.orderBurgerHandler(order, this.props.token)
  };

  inputChangedHandler = (e, inputIdentifier) => {
    const updatedFormElement = updatedObject(this.state.orderForm[inputIdentifier], {
      value:  e.target.value,
      isValid: checkValidation(e.target.value, this.state.orderForm[inputIdentifier].validation),
      touched: true
    });

    const updatedOrderForm = updatedObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    
    for (let inputIDs in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIDs].isValid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });

  };

  render() {
    window.state = this.state;

    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((el) => (
          <Input
            key={el.id}
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            inValid={!el.config.isValid}
            shouldValidate={el.config.validation}
            touched={el.config.touched}
            changed={(event) => this.inputChangedHandler(event, el.id)}
          />
        ))}
        <Button type="Success" disabled={!this.state.formIsValid}>
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mpaDispatchToProps = (dispatch) => {
  return {
    orderBurgerHandler: (orderData, token) => dispatch(orderingActions.purchaseBurger(orderData, token)),
  };
};

export default connect(mapStateToProps, mpaDispatchToProps)(withErrorHandler(ContactData, axios));

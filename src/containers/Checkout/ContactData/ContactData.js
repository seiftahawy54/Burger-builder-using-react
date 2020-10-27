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
// Importing action types
import * as actionTypes from "../../../store/actions/actionTypes";
// Import WithErrorHandler HOC.
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
// Import index file which holds the reference to all actions
import * as orderingActions from '../../../store/actions/index';

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
        "fastest",
        {},
        false,
        false
      ),
    },
    formIsValid: false,
  };

  checkValidation = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
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
    };

    this.props.orderBurgerHandler(order)

    // axios
    //   .post("/orders.json", order)
    //   .then((res) => {
    //     this.setState({ loading: false });
    //     this.props.history.push("/");
    //   })
    //   .catch((err) => {
    //     this.setState({ loading: false });
    //   });
  };

  inputChangedHandler = (e, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };

    updatedFormElement.value = e.target.value;
    updatedFormElement.isValid = this.checkValidation(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    updatedFormElement.touched = true;

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
    loading: state.order.loading
  };
};

const mpaDispatchToProps = (dispatch) => {
  return {
    orderBurgerHandler: orderData => dispatch(orderingActions.purchaseBurger(orderData)),
  };
};

export default connect(mapStateToProps, mpaDispatchToProps)(withErrorHandler(ContactData, axios));

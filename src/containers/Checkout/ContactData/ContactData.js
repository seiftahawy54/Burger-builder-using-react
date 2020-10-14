// Importing main react library with its things
import React, { Component } from "react";
import classes from "./ContactData.module.css";

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
        "",
        false,
        false
      ),
    },
    formIsValid: false,
    loading: false,
  };

  checkValidation = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    };

    axios
      .post("/orders.json", order)
      .then((res) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
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

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid});
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
        <Button type="Success" disabled={!this.state.formIsValid}>Order</Button>
      </form>
    );
    if (this.state.loading) {
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

export default ContactData;

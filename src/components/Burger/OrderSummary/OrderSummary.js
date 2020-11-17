// MAIN REACT LIBRARY and component important stuff
import React from "react"

// Importing Pux
import Pux from "../../../hoc/Pux/Pux";

// Importing Button shape
import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKeys) => {
    return (
      <li key={igKeys}>
        <span style={{ textTransform: "capitalize" }}>{igKeys}</span>:{" "}
        {props.ingredients[igKeys]}
      </li>
    );
  });

  return (
    <Pux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients: </p>
      <ul>
        { ingredientSummary }
      </ul>
      <p><b>Total Price: {props.price.toFixed(2)}$</b></p>
      <p>Continue to Checkout?</p>
      <Button type='Danger' clicked={props.purchaseCanceled}>CANCEL</Button>
      <Button type='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
    </Pux>
  )
};

export default OrderSummary;

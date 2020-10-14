// MAIN REACT LIBRARY and component important stuff
import React, { Component } from "react"

// Importing Aux
import Aux from "../../../hoc/Aux/Aux";

// Importing Button shape
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

  // UNSAFE_componentWillUpdate () {
  //   console.log('[OrderSummary] WillUpdate');
  // }
  
  componentDidUpdate () {
    console.log('[OrderSummary DidUpdate');
  }

  render = () => {
    const ingredientSummary = Object.keys(this.props.ingredients).map((igKeys) => {
      return (
        <li key={igKeys}>
          <span style={{ textTransform: "capitalize" }}>{igKeys}</span>:{" "}
          {this.props.ingredients[igKeys]}
        </li>
      );
    });
    
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients: </p>
        <ul>
          { ingredientSummary }
        </ul>
        <p><b>Total Price: {this.props.price.toFixed(2)}$</b></p>
        <p>Continue to Checkout?</p>
        <Button type='Danger' clicked={this.props.purchaseCanceled}>CANCEL</Button>
        <Button type='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Aux>
    )}
};

export default OrderSummary;

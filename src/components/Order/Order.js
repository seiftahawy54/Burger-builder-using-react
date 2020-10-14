// MAIN REACT LIBRARY and component important stuff
import React from "react";
import classes from "./Order.module.css";

const Order = (props) => {
  const ingredients = [];

  for (let ingredient in props.ingredients) {
    ingredients.push({
      name: ingredient,
      amount: props.ingredients[ingredient],
    });
  }

  console.log(ingredients);

  const ingOutput = ingredients.map((ig) => {
    return (
      <span key={ig.name} style={
        {
          display: "inline-block",
          textTransform: "capitalize",
          fontWeight: "bolder",
          margin: "0 8px",
          border: '1px solid #CCC',
          padding: "5px",
          boxShadow: "0 2px 3px #EEE",
          borderRadius: "3px",
          cursor: "pointer"
        }}>
        {ig.name} : ({ig.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingOutput}</p>
      <p>
        Price: <b>USD {Number.parseFloat(props.price).toFixed(2)}</b>
      </p>
    </div>
  );
};

export default Order;

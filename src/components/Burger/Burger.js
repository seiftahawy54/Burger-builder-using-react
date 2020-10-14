// MAIN REACT LIBRARY and component important stuff
import React from "react";
import classes from "./Burger.module.css";
// Importing withRouter to inherit the props of router.
// import { withRouter } from 'react-router-dom';

// Burger Ingredient component
import BurgerIngredient from "./Burgeringredient/Burgeringredient";

const Burger = (props) => {
  let transformedIngredients = Object
    .keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, [])

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;

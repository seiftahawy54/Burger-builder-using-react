// MAIN REACT LIBRARY and component important stuff
import React from "react";
import classes from "./CheckoutSummary.module.css";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well</h1>
      <div style={{ width: "100%", height: "auto", margin: "auto"}}>
        <Burger ingredients={props.ingredients} />
      </div>
      <div>
        <Button
          clicked={props.checkoutCancel}
          type="Danger"
        >
          Cancel
        </Button>
        <Button
          clicked={props.checkoutContinue}
          type="Success"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;

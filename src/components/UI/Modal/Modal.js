// MAIN REACT LIBRARY and component important stuff
import React from "react";
import classes from "./Modal.module.css";

// Importing Pux conatainer
import Pux from "../../../hoc/Pux/Pux";

// Importing backdrop => To make the backdrop effect
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {

  return (
    <Pux>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Pux>
  );
};

export default React.memo(Modal, (prevProps, nextProps) => {
  return (
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
  );
});

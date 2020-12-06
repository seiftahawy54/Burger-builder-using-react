import React, { useState, useEffect } from "react";
import ObjectMaker from "../../hoc/ObjectMaker/ObjectMaker";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// Importing button component from UI folder.
import Button from "../../components/UI/Button/Button";
// Importing input component from UI folder.
import Input from "../../components/UI/Input/Input";
// Importing classes module from css file.
import classes from "./Auth.module.css";
// Importing actions index file function.
import * as actions from "../../store/actions/index";
// Importing spinner ui helper.
import Spinner from "../../components/UI/Spinner/Spinner";
// Importing checkValidation utility function.
import { checkValidation } from "../../shared/utility";

const Auth = (props) => {
  const [controls, setControls] = useState({
    email: ObjectMaker(
      "input",
      { type: "text", placeholder: "Your Email" },
      "",
      { required: true, isEmail: true },
      false,
      false
    ),
    password: ObjectMaker(
      "input",
      { type: "password", placeholder: "Your Password" },
      "",
      { required: true, minLength: 6 },
      false,
      false
    ),
  });
  const [isSignup, setSignup] = useState(true);
  const { onSetAuthRedirectPath, buildingBurger, authRedirectPath } = props;

  useEffect(() => {
    if (!buildingBurger && authRedirectPath) {
      onSetAuthRedirectPath();
    }
  }, [onSetAuthRedirectPath, buildingBurger, authRedirectPath]);

  const inputChangedHandler = (e, controlName) => {
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: e.target.value,
        isValid: checkValidation(
          e.target.value,
          controls[controlName].validation
        ),
        touched: true,
      },
    };
    setControls(updatedControls);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignup);
  };

  const switchAuthModeHandler = () => {
    setSignup(!isSignup);
  };

  // Converting objects into array to be able to loop in.
  const formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key],
    });
  }

  let form = formElementsArray.map((el) => (
    <Input
      key={el.id}
      elementType={el.config.elementType}
      elementConfig={el.config.elementConfig}
      value={el.config.value}
      inValid={!el.config.isValid}
      shouldValidate={el.config.validation}
      touched={el.config.touched}
      changed={(event) => inputChangedHandler(event, el.id)}
    />
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = (
      <p
        style={{ fontWeight: "bold", color: "red", fontFamily: "Inconsolata" }}
      >
        {props.error.message}
      </p>
    );
  }

  let isAuthRedirect = null;
  if (props.isAuthenticated) {
    isAuthRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      {isAuthRedirect}
      {errorMessage}
      <form onSubmit={onSubmitHandler}>
        {form}
        <Button type="Success">Submit</Button>
      </form>
      <Button clicked={switchAuthModeHandler} type="Danger">
        Switch to {isSignup ? "Login" : "Sign Up"}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
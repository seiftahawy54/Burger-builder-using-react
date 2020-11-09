import React, { Component } from 'react';
import ObjectMaker from '../../hoc/ObjectMaker/ObjectMaker';
import { connect }from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
  state = {
    controls: {
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
      )
    },
    isSignup: true
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

  inputChangedHandler = (e, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: e.target.value,
        isValid: this.checkValidation(e.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    }
    this.setState({controls: updatedControls});
  };

  onSubmitHandler = e => {
    e.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {isSignup: !prevState.isSignup}
    });
  };

  render = () => {
    
    // Converting objects into array to be able to loop in.
    const formElementsArray = [];
    for ( let key in this.state.controls ) {
      formElementsArray.push( {
          id: key,
          config: this.state.controls[key]
      } );
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
          changed={(event) => this.inputChangedHandler(event, el.id)}
        />
      ));

    if (this.props.loading) {
      form = <Spinner />
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <p
          style={{fontWeight: 'bold', color: "red", fontFamily: "Inconsolata"}}
        >{this.props.error.message}</p>
      );
    }
    
    return (
      <div className={classes.Auth}>
        {errorMessage}
        <form onSubmit={this.onSubmitHandler}>
          {form}
          <Button type="Success">Submit</Button>
        </form>
        <Button
          clicked={this.switchAuthModeHandler}
          type="Danger"
        >Switch to {this.state.isSignup ? 'Login': 'Sign Up'}</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
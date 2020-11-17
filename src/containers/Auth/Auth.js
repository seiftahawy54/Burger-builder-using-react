import React, { Component } from 'react';
import ObjectMaker from '../../hoc/ObjectMaker/ObjectMaker';
import { connect }from 'react-redux';
import { Redirect } from 'react-router-dom';

// Importing button component from UI folder.
import Button from '../../components/UI/Button/Button';
// Importing input component from UI folder.
import Input from '../../components/UI/Input/Input';
// Importing classes module from css file.
import classes from './Auth.module.css';
// Importing actions index file function.
import * as actions from '../../store/actions/index';
// Importing spinner ui helper.
import Spinner from '../../components/UI/Spinner/Spinner';
// Importing checkvalidation utility function.
import { checkValidation } from "../../shared/utility";

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

  componentDidMount () {
    if (!this.props.buildingBurger && this.props.authRedirectPath) {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (e, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: e.target.value,
        isValid: checkValidation(e.target.value, this.state.controls[controlName].validation),
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
    
    let isAuthRedirect = null;
    if (this.props.isAuthenticated) {
      isAuthRedirect = <Redirect to={this.props.authRedirectPath} />
    }

    return (
      <div className={classes.Auth}>
        {isAuthRedirect}
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
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
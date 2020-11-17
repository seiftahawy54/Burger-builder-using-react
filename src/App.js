// React Main Library && File important imports
import React, { Component } from 'react';
// Importing react router to implement this feature.
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
// Importing connect to add the redux's state management.
import { connect } from 'react-redux';

// Components
import Layout from './hoc/Layout/Layout';

// Containers
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
// Importing AsyncComponent For lazy loading.
import AsyncComponent from './hoc/AsyncComponent/AsyncComponent';
// Importing all actions from the index file.
import * as actions from './store/actions/index';

const asyncCheckout = AsyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});
const asyncAuth = AsyncComponent(() => {
  return import('./containers/Auth/Auth');
});
const asyncOrders = AsyncComponent(() => {
  return import('./containers/Orders/Orders');
});

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render () {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/orders" component={asyncOrders}/>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

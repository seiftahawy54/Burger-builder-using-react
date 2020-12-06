// React Main Library && File important imports
import React, { useEffect, Suspense } from "react";
// Importing react router to implement this feature.
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
// Importing connect to add the redux's state management.
import { connect } from "react-redux";

// Components
import Layout from "./hoc/Layout/Layout";

// Containers
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
// Importing all actions from the index file.
import * as actions from "./store/actions/index";

// Implementing lazy loading functionality.
const Checkout = React.lazy(() => {
  return import("./containers/Checkout/Checkout");
});
const Auth = React.lazy(() => {
  return import("./containers/Auth/Auth");
});
const Orders = React.lazy(() => {
  return import("./containers/Orders/Orders");
});

const App = (props) => {

  const { onTryAutoSignUp } = props;

  useEffect(() => {
    onTryAutoSignUp();
  }, [onTryAutoSignUp]);

  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props}/>} />
      <Route path="/" exact component={BurgerBuilder} />
      <Route
        render={() => (
          <h1 style={{ textAlign: "center", color: "red" }}>PAGE NOT FOUND!</h1>
        )}
      />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/orders" render={(props) => <Orders {...props}/>} />
        <Route path="/checkout" render={(props) => <Checkout {...props}/>} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={(props) => <Auth {...props}/>} />
        <Route path="/" exact component={BurgerBuilder} />
        <Route
          render={() => (
            <h1 style={{ textAlign: "center", color: "red" }}>
              PAGE NOT FOUND!
            </h1>
          )}
        />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

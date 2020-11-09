import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// Importing react router to make the project routable.
import { BrowserRouter as Router } from "react-router-dom";
// Importing provider to enable Redux to whole app.
import { Provider } from "react-redux";
// Importing Store functionality to operate it.
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
// Importing redux thunk for allow async code to be executed.
import thunk from 'redux-thunk';
// Imorting reducer to add wanted functionality.
import BurgerBuilderRuducer from "./store/reducers/burgerBuilder";
// Importing orders reducer to add the wanted functionality.
import OrderBurgerReducer from "./store/reducers/orders";
// Importing authentication reducer to add the authentication functionality.
import Auth from './store/reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  burgerBuilder: BurgerBuilderRuducer,
  order: OrderBurgerReducer,
  auth: Auth
});

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

const app = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

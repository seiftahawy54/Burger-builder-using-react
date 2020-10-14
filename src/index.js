import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// Importing react router to make the project routable.
import { BrowserRouter as Router} from 'react-router-dom';
// Importing provider to enable Redux to whole app.
import { Provider } from 'react-redux';
// Importing Store functionality to operate it.
import { createStore } from 'redux';
// Imorting reducer to add wanted functionality.
import Reducer from './store/reducer';

const store = createStore(Reducer);

const app = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(
  app,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

// React Main Library && File importants imports
import React, { Component } from 'react';
// Importing react router to implement this feature.
import {Route, Switch} from 'react-router-dom';

// Components
import Layout from './hoc/Layout/Layout';

// Contaienrs
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends Component {

  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/orders" component={Orders}/>
            <Route path="/checkout" component={Checkout} />
            <Route path="/" exact component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </div>
    )
  }
}

export default App;

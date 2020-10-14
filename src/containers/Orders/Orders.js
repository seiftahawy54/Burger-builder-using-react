// MAIN REACT LIBRARY and component important stuff
import React, { Component } from "react";

// Importing Order Component for rendering one single order.
import Order from "../../components/Order/Order";
// Importing Axios
import axios from "../../axios-orders";
// Importing error shape HOC
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
    error: false,
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        const Data = [];
        for(let key in res.data) {
          Data.push({
            ...res.data[key],
            id: key
          });
        }

        this.setState({
          loading: false,
          orders: Data,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          error: true,
        });
      });
  }

  render() {
    if (!this.state.error) {

    }

    return (
      <div>
        {this.state.orders.map(order => {
          return <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />;
        })}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
// export default Orders;
// MAIN REACT LIBRARY and component important stuff
import React, { useEffect } from "react";

// Importing connect function to connect redux
import { connect } from "react-redux";
// Importing Order Component for rendering one single order.
import Order from "../../components/Order/Order";
// Importing Axios
import axios from "../../axios-orders";
// Importing error shape HOC
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
// Import Index file for dispatch events
import * as actions from "../../store/actions/index";
// Importing spinner from UI
import Spinner from "../../components/UI/Spinner/Spinner";

const Orders = (props) => {

  const {onFetchOrder, token, userId} = props;

  useEffect(() => {
    onFetchOrder(token, userId);
  }, [onFetchOrder, token, userId]);

  let orders = <Spinner />;
  if (!props.error) {
    orders = props.orders.map((order) => {
      return (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      );
    });
  }

  let checkingOrdersNumber =
    orders.length === 0 ? <p
      style={{
        textAlign: "center",
        fontFamily: "dancing script",
        fontSize: '2em'
      }}
    >No orders? Start ordering now!</p> : orders;

  return <div>{checkingOrdersNumber}</div>;
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrder: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));

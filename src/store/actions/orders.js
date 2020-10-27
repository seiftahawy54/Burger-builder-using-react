import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess =  (orderId, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId,
    orderData
  };
};

export const purchaseBurgerFail =  (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json", orderData)
      .then((res) => {
        console.log(res.data);
        dispatch(purchaseBurgerSuccess(res.data.name, orderData));
      })
      .catch((err) => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
};


export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders
  };
};


export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START
  };
};


export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart());
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

        dispatch(fetchOrdersSuccess(Data))
      })
      .catch((err) => {
        dispatch(fetchOrdersStart(err))
      });
  };
};
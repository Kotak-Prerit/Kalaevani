import { configureStore } from "@reduxjs/toolkit";
import {
  adminProductReducer,
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productsReducer,
} from "../reducers/productReducer";
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "../reducers/userReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "../reducers/orderReducer";
import { cartReducer } from "../reducers/cartReducer";
import config from '../config/config';

const reducer = {
  products: productReducer,
  deleteProduct: productsReducer,
  adminProduct: adminProductReducer,
  user: userReducer,
  profile: profileReducer,
  productDetails: productDetailsReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
};

const preloadedState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const store = configureStore({
  reducer,
  preloadedState,
  devTools: !config.IS_PRODUCTION
});

export default store;

import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";
import axios from "axios";

// Add to Cart
export const addItemsToCart =
  (id, quantity, size) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const newCartItem = {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[5].url,
      stock: data.product.Stock,
      size,
      quantity,
    };

    const existingCartItems = getState().cart.cartItems;
    const isItemExist = existingCartItems.find(
      (item) => item.product === id && item.size === size
    );

    let updatedCartItems;
    if (isItemExist) {
      updatedCartItems = existingCartItems.map((item) =>
        item.product === id && item.size === size ? { ...item, quantity } : item
      );
    } else {
      updatedCartItems = [...existingCartItems, newCartItem];
    }

    dispatch({
      type: ADD_TO_CART,
      payload: updatedCartItems,
    });

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

// REMOVE FROM CART
export const removeItemsFromCart = (id, size) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: { id, size },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};

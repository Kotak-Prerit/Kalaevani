import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      return {
        ...state,
        cartItems: item,
      };

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (i) =>
            !(i.product === action.payload.id && i.size === action.payload.size)
        ),
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};

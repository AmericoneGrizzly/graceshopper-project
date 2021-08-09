import axios from "axios";

const UPDATE_CART = "UPDATE_CART";
const GET_CART = "GET_CART";
const CHECKOUT_CART = "CHECKOUT_CART";

const updateCart = (cart) => ({
  type: UPDATE_CART,
  cart,
});
const getCart = (cart) => ({
  type: GET_CART,
  cart,
});
const checkoutCart = (previousOrder) => ({
  type: CHECKOUT_CART,
  previousOrder,
});
export const getCartThunk = (id) => {
  return async (dispatch) => {
    try {
      const { data: cart } = await axios.get(`/api/users/${id}`);
      dispatch(getCart(cart));
    } catch (e) {
      console.log(e);
    }
  };
};

export const updateCartThunk = (user, product, quantityChange) => {
  return async (dispatch) => {
    try {
      const { data: updatedCart } = await axios.put(`/api/users/${user.id}`, {
        product: product,
        quantityChange: quantityChange,
      });
      dispatch(updateCart(updatedCart));
    } catch (e) {
      console.log(e);
    }
  };
};

export const checkoutThunk = (id) => {
  return async (dispatch) => {
    try {
      const { data: previousOrder } = await axios.put(
        `/api/users/${id}/checkout/`
      );
      dispatch(checkoutCart(previousOrder));
    } catch (e) {
      console.log(e);
    }
  };
};
export default function cartReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_CART: {
      return action.cart;
    }
    case GET_CART: {
      return action.cart;
    }
    case CHECKOUT_CART: {
      return action.previousOrder;
    }
    default:
      return state;
  }
}

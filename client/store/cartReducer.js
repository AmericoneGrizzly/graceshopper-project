import axios from "axios";

const UPDATE_CART = "UPDATE_CART";
const GET_CART = "GET_CART";
const CHECKOUT_CART = "CHECKOUT_CART";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";

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
const removeProduct = (cart) => ({
  type: REMOVE_PRODUCT,
  cart,
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
      const token = window.localStorage.getItem("token");

      const { data: updatedCart } = await axios.put(
        `/api/users/${user.id}`,
        {
          product: product,
          quantityChange: quantityChange,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
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

export const removeProductThunk = (user, product) => {
  return async (dispatch) => {
    try {
      const { data: updatedCart } = await axios.put(`/api/users/${user.id}`, {
        product: product,
        quantityChange: 0,
      });
      dispatch(removeProduct(updatedCart));
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
    case REMOVE_PRODUCT: {
      return action.cart;
    }
    default:
      return state;
  }
}

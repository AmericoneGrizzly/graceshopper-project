import axios from 'axios';

const UPDATE_CART = 'UPDATE_CART';
const GET_CART = 'GET_CART';

const updateCart = (user) => ({
  type: UPDATE_CART,
  user,
});
const getCart = (cart) => ({
  type: GET_CART,
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
      const { data: updatedUser } = await axios.put(`/api/users/${user.id}`, {
        product: product,
        quantityChange: quantityChange,
      });
      dispatch(updateCart(updatedUser));
    } catch (e) {
      console.log(e);
    }
  };
};

export default function cartReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_CART: {
      return action.user;
    }
    case GET_CART: {
      return action.cart;
    }
    default:
      return state;
  }
}

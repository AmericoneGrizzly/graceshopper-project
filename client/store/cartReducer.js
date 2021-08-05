import axios from "axios";

const UPDATE_CART = "UPDATE_CART";

const updateCart = (user) => ({
  type: UPDATE_CART,
  user,
});

export const updateCartThunk = (user, product, quantityChange) => {
  // let user = (get the user from userId)
  // if the product from productId doesn't exist on the user, add it with quantity = quantityChange
  // if product already exists on user, quantity += quantityChange

  return async (dispatch) => {
    try {
      const { data: updatedUser } = await axios.put(`/api/users/${user.id}`,
      {product: product,
      quantityChange: quantityChange}
      );
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
    default:
      return state;
  }
}

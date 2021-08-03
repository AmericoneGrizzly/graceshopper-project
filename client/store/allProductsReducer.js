import axios from "axios";

const SET_PRODUCTS = "SET_PRODUCTS";

const initialState = {
  products: ["somethingbroke"],
};

const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products,
});

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data: products } = await axios.get("/api/products");
      dispatch(setProducts(products));
    } catch (e) {
      console.log(e);
    }
  };
};

export default function allProductsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS: {
      return { ...state, products: action.products };
    }
    default:
      return state;
  }
}

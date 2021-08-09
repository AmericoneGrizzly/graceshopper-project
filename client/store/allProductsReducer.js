import axios from "axios";

const SET_PRODUCTS = "SET_PRODUCTS";
const SET_PRODUCT = "SET_PRODUCT";
const CREATED_PRODUCT = "CREATED_PRODUCT";

const initialState = {
  products: [],
  singleProduct: {},
};

const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products,
});

const setProduct = (product) => ({
  type: SET_PRODUCT,
  product,
});

const createdProduct = (product) => ({
  type: CREATED_PRODUCT,
  product,
});

export const getSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.get(`/api/products/${id}`);
      dispatch(setProduct(product));
    } catch (e) {
      console.log(e);
    }
  };
};

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

export const _createdProduct = (product, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/products", product);
      dispatch(createdProduct(data));
      history.push("/home");
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
    case SET_PRODUCT: {
      return { ...state, singleProduct: action.product };
    }
    case CREATED_PRODUCT: {
      return { ...state, products: [...products, action.product] };
    }
    default:
      return state;
  }
}

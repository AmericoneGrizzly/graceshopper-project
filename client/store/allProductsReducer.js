import axios from "axios";

const SET_PRODUCTS = "SET_PRODUCTS";
const SET_PRODUCT = "SET_PRODUCT";
const CREATED_PRODUCT = "CREATED_PRODUCT";
const UPDATED_PRODUCT = "UPDATED_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";

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

const updatedProduct = (product) => ({
  type: UPDATED_PRODUCT,
  product,
});

const deleteProduct = (product) => ({
  type: DELETE_PRODUCT,
  product,
});

export const _updatedProduct = (product, history) => {
  return async (dispatch) => {
    try {
      console.log("update thunk product", product);
      const { data: updated } = await axios.put(
        `/api/products/${product.id}`,
        product
      );
      dispatch(updatedProduct(updated));
      history.push(`/products/${product.id}`);
    } catch (e) {
      console.log(e);
    }
  };
};

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
      const token = window.localStorage.getItem("token");

      // console.log(`token`, token);
      const { data } = await axios.post("/api/products", product, {
        headers: {
          authorization: token,
        },
      });

      dispatch(createdProduct(data));
      history.push("/home");
    } catch (e) {
      console.log(e);
    }
  };
};

export const _deleteProduct = (productId, history) => {
  return async (dispatch) => {
    try {
      const { data: deleted } = await axios.delete(
        `/api/products/${productId}`
      );
      dispatch(deleteProduct(deleted));
      history.push("/products");
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
    case UPDATED_PRODUCT: {
      let productos = state.products.map((product) =>
        product.id === action.product.id ? action.product : product
      );
      return { ...state, products: productos };
    }
    case DELETE_PRODUCT: {
      let productos = state.products.filter(
        (product) => product.id !== action.robot.id
      );
      return { ...state, products: productos };
    }
    default:
      return state;
  }
}

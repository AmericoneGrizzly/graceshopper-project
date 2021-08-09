import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
// import { fetchProducts } from "./store/allProductsReducer";
import { getCartThunk } from "../store/cartReducer";

class Cart extends Component {
  // constructor(props) {
  //   super(props);
  //   this.addProductToCart = this.addProductToCart.bind(this);
  // }

  componentDidMount() {
    // fetch all products from db and setstate
    //this.props.getProducts();
    this.props.getCart(this.props.user.id);
  }

  // addProductToCart(product) {
  //   console.log("product to be added: ", product);
  //   this.props.updateCart(this.props.user, product, 1);
  // }

  render() {
    console.log("these are my props: ", this.props);
    return (
      <div className="your-cart">
        {this.props.cart && this.props.cart.length > 0 ? (
          <div>
            <h1>Cart</h1>
            {this.props.cart.map((item) => (
              <div key={item.id}>
                <Link to={`/items/${item.id}`}>
                  <div>
                    <img src={item.imageURL} alt="picture of soda" />
                  </div>
                  <h3>{item.name}</h3>
                  <h3>Qty: {item.cart.quantity}</h3>
                  <h1>${item.price}</h1>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <h1>No cart!</h1>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  isLoggedIn: !!state.auth.id,
  user: state.auth,
  cart: state.cartReducer,
});

const mapDispatch = (dispatch) => ({
  getCart: (id) => dispatch(getCartThunk(id)),
  // updateCart: (user, product, quantityChange) =>
  //   dispatch(updateCartThunk(user, product, quantityChange)),
});

export default withRouter(connect(mapState, mapDispatch)(Cart));

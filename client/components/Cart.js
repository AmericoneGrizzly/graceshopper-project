import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  getCartThunk,
  checkoutThunk,
  updateCartThunk,
  removeProductThunk,
} from "../store/cartReducer";
import { displayPrice } from "../utils";

//TODO add logic for handling zeros and stuff
class Cart extends Component {
  componentDidMount() {
    this.props.getCart(this.props.user.id);
  }
  render() {
    console.log("these are my props: ", this.props);

    const orderMessage =
      this.props.cart.type === "previous" ? "Order Confirmed!" : "Cart";

    return (
      <div className="products-list">
        {this.props.cart.products && this.props.cart.products.length > 0 ? (
          <div>
            <h1>{orderMessage}</h1>
            <button
              id="checkout-button"
              type="button"
              onClick={() => this.props.checkoutThunk(this.props.user.id)}
            >
              Checkout
            </button>
            {this.props.cart.products.map((item) => (
              <div key={item.id}>
                <Link to={`/products/${item.id}`}>
                  <div>
                    <img src={item.imageURL} alt="picture of soda" />
                  </div>
                  <h3>{item.name}</h3>
                </Link>
                <h3>Qty: {item.cart.quantity}</h3>
                {item.cart.quantity > 1 && (
                  <button
                    id="less-quantity-button"
                    type="button"
                    onClick={() =>
                      this.props.updateCart(this.props.user, item, -1)
                    }
                  >
                    -
                  </button>
                )}{" "}
                <button
                  id="more-quantity-button"
                  type="button"
                  onClick={() =>
                    this.props.updateCart(this.props.user, item, 1)
                  }
                >
                  +
                </button>
                {" "}
                <button
                id="remove-product-button"
                type="button"
                onClick={() =>
                  this.props.removeProduct(this.props.user, item)
                }
                >
                  Remove
                </button>
                <h1>${displayPrice(item.price)}</h1>
              </div>
            ))}
          </div>
        ) : (
          <h1>Nothing in your cart!</h1>
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
  getCart: (userId) => dispatch(getCartThunk(userId)),
  checkoutThunk: (userId) => dispatch(checkoutThunk(userId)),
  updateCart: (user, product, quantityChange) =>
    dispatch(updateCartThunk(user, product, quantityChange)),
  removeProduct: (user, product) =>
    dispatch(removeProductThunk(user, product)),
});

export default withRouter(connect(mapState, mapDispatch)(Cart));

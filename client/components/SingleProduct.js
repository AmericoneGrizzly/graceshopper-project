import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getSingleProduct } from "../store/allProductsReducer";
import { updateCartThunk } from "../store/cartReducer";
import { displayPrice } from "../utils";

class SingleProduct extends Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id);
    console.log("these are my single product props:", this.props);
  }

  render() {
    return (
      <div className="single-product-view">
        <div>
          <div>
            <img src={this.props.product.imageURL} alt="picture of soda" />
          </div>
          <h1 className="single-name">{this.props.product.name}</h1>
          <h2>${displayPrice(this.props.product.price)}</h2>
          <button
            id="add-product-button"
            onClick={() =>
              this.props.updateCart(this.props.user, this.props.product, 1)
            }
          >
            Add To Cart
          </button>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  product: state.allProductsReducer.singleProduct,
  user: state.auth,
});

const mapDispatch = (dispatch) => ({
  getSingleProduct: (id) => dispatch(getSingleProduct(id)),
  updateCart: (user, product, quantityChange) =>
    dispatch(updateCartThunk(user, product, quantityChange)),
});

export default withRouter(connect(mapState, mapDispatch)(SingleProduct));

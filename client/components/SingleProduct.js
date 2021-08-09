import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { getSingleProduct } from "../store/allProductsReducer";

class SingleProduct extends Component {
  // constructor() {
  //   super()
  //   this.addToCart= this.addToCart.bind(this);
  // }
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
          <h2>${this.props.product.price}</h2>
          <button id="add-product-button">Add To Cart</button>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  product: state.allProductsReducer.singleProduct,
});

const mapDispatch = (dispatch) => ({
  getSingleProduct: (id) => dispatch(getSingleProduct(id)),
});

export default withRouter(connect(mapState, mapDispatch)(SingleProduct));

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { getSingleProduct } from "../store/allProductsReducer";
import EditProduct from "./EditProduct";

class SingleProduct extends Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id);
    console.log("these are my single product props:", this.props);
  }

  handleDelete(event) {
    event.preventDefault();
    this.props.deleteProduct(event.target.id);
  }

  render() {
    return (
      <div>
        {Object.keys(this.props.user).length &&
        this.props.user.role === "ADMINISTRATOR" ? (
          <div className="single-product-view">
            <div>
              <div>
                <img src={this.props.product.imageURL} alt="picture of soda" />
              </div>
              <h1 className="single-name">{this.props.product.name}</h1>
              <h2>${this.props.product.price}</h2>
              <button id="add-product-button">Add To Cart</button>
              <div id="edit-container">
                <EditProduct product={this.props.product} />
              </div>
            </div>
          </div>
        ) : (
          <div className="single-product-view">
            <div>
              <img src={this.props.product.imageURL} alt="picture of soda" />
            </div>
            <h1 className="single-name">{this.props.product.name}</h1>
            <h2>${this.props.product.price}</h2>
            <button id="add-product-button">Add To Cart</button>
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  product: state.allProductsReducer.singleProduct,
  isLoggedIn: !!state.auth.id,
  user: state.auth,
});

const mapDispatch = (dispatch) => ({
  getSingleProduct: (id) => dispatch(getSingleProduct(id)),
  deleteProduct: (id) => dispatch(_deleteProduct(id, history)),
});

export default withRouter(connect(mapState, mapDispatch)(SingleProduct));

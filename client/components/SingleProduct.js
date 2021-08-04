import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { getSingleProduct } from './store/allProductsReducer';

class SingleProduct extends Component {
  // constructor() {
  //   super()
  //   this.addToCart= this.addToCart.bind(this);
  // }
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id);
    console.log('these are my single product props:', this.props);
  }

  render() {
    return (
      <div>
        <h1>This is the AllProducts component</h1>
        <div>
          <div>
            <img src={this.props.product.imageURL} alt="picture of soda" />
          </div>
          <h3>{this.props.product.name}</h3>
          <h1>${this.props.product.price}</h1>
          <button>Add To Cart</button>
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

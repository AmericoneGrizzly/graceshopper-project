import React, { Component } from 'react';
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect, Link } from 'react-router-dom'
import SingleProduct from './SingleProduct';
import allProductsReducer, { fetchProducts } from './store/allProductsReducer';


class AllProducts extends Component {
  componentDidMount() {
    // fetch all products from db and setstate
    this.props.getProducts();
  }

  render() {
    console.log('these are my props: ', this.props);
    return (
      <div>
        <h1>This is the AllProducts component</h1>
        {this.props.products.map(product => <h3>{product}</h3>)}
      </div>
    )
  }
}

const mapState = (state) => ({
  products: state.allProductsReducer.products
});

const mapDispatch = (dispatch) => ({
  getProducts: () => dispatch(fetchProducts())
});

export default withRouter(connect(mapState, mapDispatch)(AllProducts));

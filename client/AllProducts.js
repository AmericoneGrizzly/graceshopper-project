import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
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
        {this.props.products.map((product) => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              <div>
                <img src={product.imageURL} alt="picture of soda" />
              </div>
              <h3>{product.name}</h3>
              <h1>${product.price}</h1>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

const mapState = (state) => ({
  products: state.allProductsReducer.products,
});

const mapDispatch = (dispatch) => ({
  getProducts: () => dispatch(fetchProducts()),
});

export default withRouter(connect(mapState, mapDispatch)(AllProducts));

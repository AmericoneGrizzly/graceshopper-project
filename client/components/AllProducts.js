import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchProducts } from '../store/allProductsReducer';
import { updateCartThunk } from '../store/cartReducer';

class AllProducts extends Component {
  constructor (props) {
    super(props);
    this.addProductToCart = this.addProductToCart.bind(this);
  }

  componentDidMount() {
    // fetch all products from db and setstate
    this.props.getProducts();
  }

  addProductToCart(product) {
    console.log("product to be added: ", product);
    this.props.updateCart(this.props.user, product, 1);
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
            <h1>{product.price}</h1>
            </Link>
            {this.props.isLoggedIn && <button type="button" id="add-product-button" onClick={() => this.addProductToCart(product)}>Add To Cart</button>}
          </div>
        ))}
      </div>
    );
  }
}

const mapState = (state) => ({
  isLoggedIn: !!state.auth.id,
  user: state.auth,
  products: state.allProductsReducer.products,
});

const mapDispatch = (dispatch) => ({
  getProducts: () => dispatch(fetchProducts()),
  updateCart: (user, product, quantityChange) => dispatch(updateCartThunk(user, product, quantityChange))
});

export default withRouter(connect(mapState, mapDispatch)(AllProducts));

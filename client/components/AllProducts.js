import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { fetchProducts } from "../store/allProductsReducer";
import { updateCartThunk } from "../store/cartReducer";

class AllProducts extends Component {
  constructor(props) {
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
    console.log("these are my props: ", this.props);
    return (
      <div>
      {Object.keys(this.props.user).length && this.props.user.role === "ADMINISTRATOR" ? (
        <div id="all-products">
        <video
        className="pp-video-player"
        src="https://hype.com/wp-content/uploads//2019/10/191029-MFP-Video-Website-No-sound-2560x1080-2-gradients-Compressed-30.mp4"
        autoplay=""
        webkit-playsinline=""
        playsinline=""
        loop=""
        muted="muted"
        controlslist="nodownload"
        poster=""
        preload="none"
      ></video>
      {this.props.products.map((product) => (
        <div key={product.id} className="single-product">
          <div>
            <Link to={`/products/${product.id}`}>
              <img
                src={product.imageURL}
                alt="picture of soda"
                className="can-img"
              />
              <h3 className="product-name">{product.name}</h3>
            </Link>
          </div>
          <h1>${product.price}</h1>
          {this.props.isLoggedIn && (
            <div className="Buttons">
            <button
              type="button"
              id="add-product-button"
              onClick={() => this.addProductToCart(product)}
            >
              Add To Cart
            </button>
            <button
              type="button"
              id="edit-product-button"
            >
              Edit Product
            </button>
            </div>
          )}
        </div>
      ))}
    </div>
        ) : (
          <div id="all-products">
          <video
          className="pp-video-player"
          src="https://hype.com/wp-content/uploads//2019/10/191029-MFP-Video-Website-No-sound-2560x1080-2-gradients-Compressed-30.mp4"
          autoplay=""
          webkit-playsinline=""
          playsinline=""
          loop=""
          muted="muted"
          controlslist="nodownload"
          poster=""
          preload="none"
        ></video>
        {this.props.products.map((product) => (
          <div key={product.id} className="single-product">
            <div>
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.imageURL}
                  alt="picture of soda"
                  className="can-img"
                />
                <h3 className="product-name">{product.name}</h3>
              </Link>
            </div>
            <h1>${product.price}</h1>
            {this.props.isLoggedIn && (
              <button
                type="button"
                id="add-product-button"
                onClick={() => this.addProductToCart(product)}
              >
                Add To Cart
              </button>
            )}
          </div>
        ))}
      </div>
        )}
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
  updateCart: (user, product, quantityChange) =>
    dispatch(updateCartThunk(user, product, quantityChange)),
});

export default withRouter(connect(mapState, mapDispatch)(AllProducts));

import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div id="nav-bar">
    <h1 className="site-title">Caffein-E Commerce</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home" className="nav-text">
            Home
          </Link>
          <Link to="/cart">
            <img src="https://www.elementvape.com/pub/static/version1628148755/frontend/Codazon/unlimited_elementvape/en_US/images/shopping-cart.svg" />
          </Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login" className="nav-text">
            Login
          </Link>
          <Link to="/signup" className="nav-text">
            Sign Up
          </Link>
          <Link to="/cart">
            <img src="https://www.elementvape.com/pub/static/version1628148755/frontend/Codazon/unlimited_elementvape/en_US/images/shopping-cart.svg" />
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

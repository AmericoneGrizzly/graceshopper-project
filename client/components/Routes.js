import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './AuthForm';
import Home from './Home';
import { me } from '../store';
import AllProducts from './AllProducts';
import SingleProduct from './SingleProduct';
import Cart from './Cart';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/" exact component={AllProducts} />
            <Route path="/products/:id" component={SingleProduct} />
            <Route path="/home" component={Home} />
            <Route path="/cart" exact component={Cart} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={AllProducts} />
            <Route path="/products/:id" component={SingleProduct} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    );
  }
}

// {
/* <Route
path="/robots/:id"
render={(routeProps) => (
  <Robot
    robots={this.props.robots}
    projects={this.props.projects}
    id={routeProps.match.params.id * 1}
    history={routeProps.history}
  />
)}
/> */
// }

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

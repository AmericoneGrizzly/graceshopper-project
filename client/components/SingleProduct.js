import React, { Component } from 'react';
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'


class SingleProduct extends Component {
  componentDidMount() {

  }

  render() {

    return (
      <div>
        <h1>This is a single product component</h1>
      </div>
    )
  }
}

export default withRouter(connect(null)(SingleProduct));

import React from 'react';
import { connect } from 'react-redux';
//import { _createRobot } from '../redux/robots';

class ProductForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      price: '',
      category: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createRobot(this.state, this.props.history);
    this.setState({
      name: '',
      fuelType: '',
      fuelLevel: 0,
    });
  };

  render() {
    return (
      <div id="container">
        <br />
        <br />
        <h2>Add A New Robot?</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Robot Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label htmlFor="fuelType">Choose A Fuel: </label>
          <select
            onChange={this.handleChange}
            value={this.state.fuelType}
            name="fuelType"
          >
            <option value="electric">Electric</option>
            <option value="diesel">Diesel</option>
            <option value="gas">Gas</option>
          </select>
          <label htmlFor="fuelLevel">Fuel Level:</label>
          <input
            type="text"
            name="fuelLevel"
            value={this.state.fuelLevel}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, history) => ({
  createRobot: (robot) => dispatch(_createRobot(robot, history)),
});

export default connect(null, mapDispatchToProps)(RobotForm);
import React from "react";
import { connect } from "react-redux";
import history from "../history";
import { _createdProduct } from "../store/allProductsReducer";

class ProductForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: "",
      category: "HIGH_CALORIE",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createProduct(this.state, this.props.history);
    this.setState({
      name: "",
      price: "",
      category: "HIGH_CALORIE",
    });
  };

  render() {
    return (
      <div id="container">
        <br />
        <br />
        <h2>Add A New Product?</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label htmlFor="price">Choose A Price: </label>
          <input
            type="text"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />
          <label htmlFor="category">Caffeine Type:</label>
          <select
            onChange={this.handleChange}
            value={this.state.fuelType}
            name="category"
          >
            <option value="LETHAL">Lethal</option>
            <option value="LOW_CALORIE">Low_Calorie</option>
            <option value="HIGH_CALORIE">High_Calorie</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, history) => ({
  createProduct: (product) => dispatch(_createdProduct(product, history)),
});

export default connect(null, mapDispatchToProps)(ProductForm);

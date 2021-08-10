import React from "react";
import { connect } from "react-redux";
import { _updatedProduct } from "../store/allProductsReducer";

class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: "0",
      category: "LETHAL",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.updateProduct(
      { ...this.props.product, ...this.state },
      this.props.history
    );
    this.setState({
      name: "",
      price: 0,
      category: "LETHAL",
    });
  };

  render() {
    return (
      <div id="container">
        <br />
        <br />
        <h2>Edit Product?</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Product Name:</label>
          <input
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label htmlFor="price">Price:</label>
          <input
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />
          <label htmlFor="category">Choose A Category: </label>
          <select
            onChange={this.handleChange}
            value={this.state.category}
            name="category"
          >
            <option value="HIGH_CALORIE">HIGH_CALORIE</option>
            <option value="LOW_CALORIE">LOW_CALORIE</option>
            <option value="LETHAL">LETHAL</option>
          </select>
          <button type="submit" className="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, history) => ({
  updateProduct: (product) => dispatch(_updatedProduct(product, history)),
});

export default connect(null, mapDispatchToProps)(EditProduct);

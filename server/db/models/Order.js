const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  type: {
    type: Sequelize.ENUM("active", "wishlist", "previous"),
    defaultValue: "active",
  },
});

module.exports = Order;

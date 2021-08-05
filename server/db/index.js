//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const Cart = require("./models/Cart");

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    Cart,
  },
};

User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Product, { through: Cart });
Product.belongsToMany(Order, { through: Cart });

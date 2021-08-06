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

Order.prototype.incrementProduct = async function (productId, qty) {
  const productList = await this.getProducts();
  const productInOrder = productList.filter(
    (prod) => prod.id === productId
  ).length;

  const carp = await Cart.findAll({
    where: {
      orderId: this.id,
      productId: productId,
    },
  });
  let newQty = productInOrder ? carp[0].quantity + qty : qty;

  // console.log("found it");

  this.addProduct(productId, { through: { quantity: newQty } });
  // console.log(`this`, this);

  // console.log(productList);
};
User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Product, { through: Cart });
Product.belongsToMany(Order, { through: Cart });

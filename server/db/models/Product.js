const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue:
      'https://www.saashub.com/images/app/service_logos/16/1e550b6dd28e/large.png?1539661217',
  },
  category: {
    type: Sequelize.ENUM('LOW_CALORIE', 'HIGH_CALORIE', 'LETHAL'),
    defualtValue: 'HIGH_CALORIE',
  },
});

module.exports = Product;

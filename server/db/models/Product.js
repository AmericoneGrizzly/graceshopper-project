const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  imageURL: {
    type: Sequelize.TEXT,
    defaultValue:
      "https://www.saashub.com/images/app/service_logos/16/1e550b6dd28e/large.png?1539661217",
  },
  category: {
    type: Sequelize.ENUM("LOW_CALORIE", "HIGH_CALORIE", "LETHAL"),
    defualtValue: "HIGH_CALORIE",
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu est condimentum, " + 
      "ommodo leo sed, venenatis ligula. Maecenas elementum diam ut dui placerat malesuada. " + 
      "In nulla turpis, sodales in libero laoreet, vulputate aliquet ante. Maecenas tortor nibh, " + 
      "suscipit a aliquet sit amet, accumsan imperdiet odio. Vestibulum a accumsan ante. Phasellus " + 
      "dictum fermentum velit, et blandit odio semper ac. Nulla id sagittis augue. Nulla a congue nibh, " + 
      "euismod maximus orci. Nunc venenatis blandit libero, ut aliquet ex feugiat vitae. Ut luctus luctus " + 
      "pretium. Fusce commodo massa in tortor pharetra, sit amet finibus ipsum pharetra. Pellentesque rhoncus " + 
      "purus sit amet mauris auctor, ac interdum mi tincidunt. Aenean ut purus suscipit, tincidunt lorem quis, " + 
      "mattis mi. Donec eget ligula sed libero luctus vestibulum vel nec eros."
  }
});

module.exports = Product;

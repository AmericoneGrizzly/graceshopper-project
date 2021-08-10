"use strict";

const {
  db,
  models: { User, Product, Order },
} = require("../server/db");

const Users = [
  {
    username: "tommy@aol.com",
    password: "tommy123",
    email: "tommy@aol.com",
    address: "1 tommy lane",
    role: "CUSTOMER",
  },
  {
    username: "helen@aol.com",
    password: "helen123",
    email: "helen@aol.com",
    address: "1 helen lane",
    role: "ADMINISTRATOR",
  },
  {
    username: "billy@aol.com",
    password: "billy123",
    email: "billy@aol.com",
    address: "1 billy lane",
    role: "ADMINISTRATOR",
  },
  {
    username: "sam@aol.com",
    password: "sam123",
    email: "sam@aol.com",
    address: "1 sammy lane",
    role: "CUSTOMER",
  },
  {
    username: "roger@aol.com",
    password: "roger123",
    email: "roger@aol.com",
    address: "1 roger lane",
    role: "CUSTOMER",
  },
  {
    username: "angie@aol.com",
    password: "ANGIE123",
    email: "angie@aol.com",
    address: "1 angelica lane",
    role: "ADMINISTRATOR",
  },
  {
    username: "Gary@aol.com",
    password: "Gary123",
    email: "Gary@aol.com",
    address: "1 Gary lane",
    role: "ADMINISTRATOR",
  },
  {
    username: "William@aol.com",
    password: "William123",
    email: "William@aol.com",
    address: "1 William lane",
    role: "CUSTOMER",
  },
  {
    username: "Stacey@aol.com",
    password: "Stacey123",
    email: "Stacey@aol.com",
    address: "1 Stacey lane",
    role: "ADMINISTRATOR",
  },
  {
    username: "Travis@aol.com",
    password: "Travis123",
    email: "Travis@aol.com",
    address: "1 Travis lane",
    role: "ADMINISTRATOR",
  },
];

const Products = [
  {
    name: "Red Bull",
    price: "399",
    quantity: 1000,
    category: "HIGH_CALORIE",
    imageURL:
      "https://www.webstaurantstore.com/images/products/medium/322422/1731953.jpg",
  },
  {
    name: "Monster",
    price: "299",
    quantity: 1000,
    category: "HIGH_CALORIE",
    imageURL:
      "https://orderacme.s3.amazonaws.com/ProductImages/00070847811169.medium.jpg",
  },
  {
    name: "Bang",
    price: "399",
    quantity: 1000,
    category: "LOW_CALORIE",
    imageURL:
      "https://cdn.shopify.com/s/files/1/0428/0447/8115/products/bang-energy-drink-pepsi-beverages-company-concessions-blue-razz-20346242105507_100x100_crop_center@2x.jpg?v=1625691028",
  },
  {
    name: "Reign",
    price: "299",
    quantity: 1000,
    category: "LOW_CALORIE",
    imageURL:
      "https://orderacme.s3.amazonaws.com/ProductImages/00815154022118.medium.jpg",
  },
  {
    name: "Coke Energy",
    price: "199",
    quantity: 1000,
    category: "HIGH_CALORIE",
    imageURL:
      "https://cdn.shopify.com/s/files/1/0270/6410/7107/products/energy3_200x.jpg?v=1582494393",
  },
  {
    name: "Redline Xtreme",
    price: "349",
    quantity: 1000,
    category: "LETHAL",
    imageURL:
      "https://i.ebayimg.com/thumbs/images/g/jncAAOSw-0VevXhJ/s-l200.jpg",
  },
  {
    name: "Spike Hardcore Energy",
    price: "379",
    quantity: 1000,
    category: "LETHAL",
    imageURL:
      "https://www.caffeineinformer.com/wp-content/uploads/spike-shooter-150x150.jpg",
  },
  {
    name: "NOS",
    price: "259",
    quantity: 1000,
    category: "HIGH_CALORIE",
    imageURL:
      "https://orderacme.s3.amazonaws.com/ProductImages/00815154020008.medium.jpg",
  },
  {
    name: "Rockstar Energy",
    price: "259",
    quantity: 1000,
    category: "HIGH_CALORIE",
    imageURL:
      "https://www.kroger.com/product/images/medium/front/0081809400001",
  },
  {
    name: "5 Hour Energy",
    price: "249",
    quantity: 1000,
    category: "HIGH_CALORIE",
    imageURL:
      "https://www.webstaurantstore.com/images/products/medium/442364/1821293.jpg",
  },
  {
    name: "Hype Energy",
    price: 379,
    quantity: 1000,
    category: "HIGH_CALORIE",
    imageURL:
      "https://media.takealot.com/covers_images/b877d78084164f25abeb105707a57ac4/s-fb.file",
  },
  {
    name: "ZOA",
    price: 379,
    quantity: 1000,
    category: "HIGH_CALORIE",
    imageURL:
      "https://www.gnc.com/dw/image/v2/BBLB_PRD/on/demandware.static/-/Sites-master-catalog-gnc/default/dwca3a9495/hi-res/587518_web_ZOA%20Zero%20Wild%20Orange_can_Front.jpg",
  },
];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  try {
    await db.sync({ force: true }); // clears db and matches models to tables
    console.log("db synced!");
    // Creating Users
    await Promise.all(
      Users.map((user) => {
        return User.create(user);
      })
    );

    await Promise.all(
      Products.map((product) => {
        return Product.create(product);
      })
    );
    let user1 = await User.findByPk(1, { include: [{ model: Order }] });

    const order1 = await Order.create({ type: "previous" });
    await order1.setUser(user1);

    const energyDrink1 = await Product.findByPk(1);
    const energyDrink2 = await Product.findByPk(2);

    await order1.addProduct(energyDrink1);
    await order1.addProduct(energyDrink2);
    user1 = await User.findByPk(1, { include: { model: Order } });
    console.log(`seeded ${Users.length} users`);
    console.log(`seeded successfully`);
    console.log(`seeded ${Products.length} products`);
    console.log(`seeded successfully`);
  } catch (err) {
    console.log(err);
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;

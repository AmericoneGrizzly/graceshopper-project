"use strict";

const {
  db,
  models: { User, Product },
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
    price: 399,
    quantity: 1000,
    category: "HIGH_CALORIE",
    imageURL:
      "https://www.webstaurantstore.com/images/products/medium/322422/1731953.jpg",
  },
  {
    name: "Monster",
    price: 299,
    quantity: 1000,
    category: "HIGH_CALORIE",
    imageURL:
      "https://orderacme.s3.amazonaws.com/ProductImages/00070847811169.medium.jpg",
  },
  {
    name: "Bang",
    price: 399,
    quantity: 1000,
    category: "LOW_CALORIE",
    imageURL:
      "https://www.kroger.com/product/images/medium/front/0061076486363",
  },
  {
    name: "Reign",
    price: 299,
    quantity: 1000,
    category: "LOW_CALORIE",
    imageURL:
      "https://orderacme.s3.amazonaws.com/ProductImages/00815154022118.medium.jpg",
  },
  {
    name: "Coke Energy",
    price: 199,
    quantity: 1000,
    category: "HIGH_CALORIE",
    imageURL:
      "https://cdn.shopify.com/s/files/1/0270/6410/7107/products/energy3_200x.jpg?v=1582494393",
  },
  {
    name: "Redline Xtreme",
    price: 349,
    quantity: 1000,
    category: "LETHAL",
    imageURL:
      "https://i.ebayimg.com/thumbs/images/g/jncAAOSw-0VevXhJ/s-l200.jpg",
  },
  {
    name: "Spike Hardcore Energy",
    price: 379,
    quantity: 1000,
    category: "LETHAL",
    imageURL:
      "https://www.caffeineinformer.com/wp-content/uploads/spike-shooter-150x150.jpg",
  },
  {
    name: "NOS",
    price: 259,
    quantity: 1000,
    category: "HIGH_CALORIE",
    imageURL:
      "https://orderacme.s3.amazonaws.com/ProductImages/00815154020008.medium.jpg",
  },
  {
    name: "Rockstar Energy",
    price: 259,
    quantity: 1000,
    category: "HIGH_CALORIE",
    imageURL:
      "https://www.kroger.com/product/images/medium/front/0081809400001",
  },
  {
    name: "5 Hour Energy",
    price: 249,
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
      "data:image/jpeg;base64,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",
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

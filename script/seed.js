'use strict';

const {
  db,
  models: { User, Product },
} = require('../server/db');

const Users = [
  {
    username: 'Tommy B',
    password: 'tommy123',
    email: 'tommy@aol.com',
    address: '1 tommy lane',
    role: 'CUSTOMER',
  },
  {
    username: 'Helen C',
    password: 'helen123',
    email: 'helen@aol.com',
    address: '1 helen lane',
    role: 'ADMINISTRATOR',
  },
  {
    username: 'Billy G',
    password: 'billy123',
    email: 'billy@aol.com',
    address: '1 billy lane',
    role: 'ADMINISTRATOR',
  },
  {
    username: 'Sam S',
    password: 'sam123',
    email: 'sam@aol.com',
    address: '1 sammy lane',
    role: 'CUSTOMER',
  },
  {
    username: 'Roger L',
    password: 'roger123',
    email: 'roger@aol.com',
    address: '1 roger lane',
    role: 'CUSTOMER',
  },
  {
    username: 'ANGIE O',
    password: 'ANGIE123',
    email: 'angie@aol.com',
    address: '1 angelica lane',
    role: 'ADMINISTRATOR',
  },
  {
    username: 'Gary T',
    password: 'Gary123',
    email: 'Gary@aol.com',
    address: '1 Gary lane',
    role: 'ADMINISTRATOR',
  },
  {
    username: 'William H',
    password: 'William123',
    email: 'William@aol.com',
    address: '1 William lane',
    role: 'CUSTOMER',
  },
  {
    username: 'Stacey Q',
    password: 'Stacey123',
    email: 'Stacey@aol.com',
    address: '1 Stacey lane',
    role: 'ADMINISTRATOR',
  },
  {
    username: 'Travis P',
    password: 'Travis123',
    email: 'Travis@aol.com',
    address: '1 Travis lane',
    role: 'ADMINISTRATOR',
  },
];

const Products = [
  {
    name: 'Red Bull',
    price: '3.99',
    quantity: 1000,
    category: 'HIGH_CALORIE',
  },
  {
    name: 'Monster',
    price: '2.99',
    quantity: 1000,
    category: 'HIGH_CALORIE',
  },
  {
    name: 'Bang',
    price: '3.99',
    quantity: 1000,
    category: 'LOW_CALORIE',
  },
  {
    name: 'Reign',
    price: '2.99',
    quantity: 1000,
    category: 'LOW_CALORIE',
  },
  {
    name: 'Coke Energy',
    price: '1.99',
    quantity: 1000,
    category: 'HIGH_CALORIE',
  },
  {
    name: 'Redline Xtreme',
    price: '3.49',
    quantity: 1000,
    category: 'LETHAL',
  },
  {
    name: 'Spike Hardcore Energy',
    price: '3.79',
    quantity: 1000,
    category: 'LETHAL',
  },
  {
    name: 'NOS',
    price: '2.59',
    quantity: 1000,
    category: 'HIGH_CALORIE',
  },
  {
    name: 'Rockstar Energy',
    price: '2.59',
    quantity: 1000,
    category: 'HIGH_CALORIE',
  },
  {
    name: '5 Hour Energy',
    price: '2.49',
    quantity: 1000,
    category: 'HIGH_CALORIE',
  },
];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  try {
    await db.sync({ force: true }); // clears db and matches models to tables
    console.log('db synced!');
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
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
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

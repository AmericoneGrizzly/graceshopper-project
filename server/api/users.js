const router = require("express").Router();
const {
  models: { User, Cart, Order, Product },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const puppies = await User.findByPk(req.params.id, {
      include: [
        {
          model: Order,
          include: [Product],
        },
      ],
    });
    console.log(`puppies.orders`, puppies.orders);
    let currentOrder = {};
    if (puppies.orders.length) {
      console.log("truthy");
      currentOrder = puppies.orders[0];
    } else {
      console.log("No Order Found!");
      currentOrder = await Order.create();
      await currentOrder.setUser(puppies);
    }
    // console.log("puppies", puppies.toJSON());
    //console.log("puppies", puppies);
    const message = await currentOrder.incrementProduct(req.body.product.id, 1);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.params.id, {
      include: [
        {
          model: Order,
          include: [Product],
        },
      ],
    });
    console.log(`currentUser`, currentUser);
    res.send(await currentUser.orders[0].getProducts());
  } catch (err) {
    console.log(err);
  }
});

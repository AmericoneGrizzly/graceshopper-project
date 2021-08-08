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
          where: {
            type: "active",
          },
          required: false,
          include: [Product],
        },
      ],
    });
    console.log(`puppies`, puppies);
    let currentOrder = {};
    //TODO
    //add logic to check for open/closed orders
    if (puppies.orders.length) {
      currentOrder = puppies.orders[0];
      console.log(`currentOrder`, currentOrder);
    } else {
      currentOrder = await Order.create({ userId: puppies.id });
      console.log(`currentOrdernew`, currentOrder);

      // await currentOrder.setUser(puppies);
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
          where: {
            type: "active",
          },
          include: [Product],
        },
      ],
    });
    console.log(`currentUser`, currentUser);
    if (currentUser) {
      res.send(await currentUser.orders[0].getProducts());
    } else {
      res.send();
    }
  } catch (err) {
    console.log(err);
  }
});

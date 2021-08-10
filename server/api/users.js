const router = require("express").Router();
const { requireToken } = require("./utils");
const {
  models: { User, Cart, Order, Product },
} = require("../db");
module.exports = router;

//close order
router.put("/:id/checkout", async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.params.id, {
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

    let currentOrder = {};
    if (currentUser.orders.length) {
      currentOrder = currentUser.orders[0];

      await currentOrder.update({ type: "previous" });
    } else {
      throw new Error("Empty Cart");
    }
    res.send(currentOrder);
  } catch (err) {
    console.log(err);
  }
});

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

//Add an order to the cart
router.put("/:id", requireToken, async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.params.id, {
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
    let currentOrder = {};

    if (currentUser.orders.length) {
      currentOrder = currentUser.orders[0];
    } else {
      currentOrder = await Order.create({ userId: currentUser.id });
    }
    await currentOrder.incrementProduct(
      req.body.product.id,
      req.body.quantityChange
    );
    const updatedOrder = await Order.findByPk(currentOrder.dataValues.id, {
      include: [Product],
    });

    res.send(updatedOrder);
  } catch (err) {
    console.log(err);
  }
});

//get active order
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
    if (currentUser) {
      res.send(await currentUser.orders[0]);
    } else {
      res.send();
    }
  } catch (err) {
    console.log(err);
  }
});

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
    const currentOrder = puppies.orders[0];
    // console.log("puppies", puppies.toJSON());
    // console.log("puppies", puppies.orders[0].products);

    const message = await currentOrder.incrementProduct(req.body.product.id, 1);
    //console.log(message);
    //   const productInCart = await Cart.findAll({
    //     where: {
    //       userId: req.params.id,
    //       productId: req.body.product.id,
    //     },
    //   });
    //   if (!productInCart.length) {
    //     await currentUser.addProduct(req.body.product.id, {
    //       through: { quantity: req.body.quantityChange },
    //     });
    //   } else {
    //     const newQuantity = productInCart[0].quantity + req.body.quantityChange;
    //     await productInCart[0].update({
    //       quantity: newQuantity,
    //     });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.params.id);
    res.send(await currentUser.getProducts());
  } catch (err) {
    console.log(err);
  }
});

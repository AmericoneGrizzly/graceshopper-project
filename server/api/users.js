const router = require("express").Router();
const {
  models: { User, Cart },
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
    const currentUser = await User.findByPk(req.params.id);
    const productInCart = await Cart.findAll({
      where: {
        userId: req.params.id,
        productId: req.body.product.id,
      },
    });
    if (!productInCart.length) {
      await currentUser.addProduct(req.body.product.id, {
        through: { quantity: req.body.quantityChange },
      });
    } else {
      const newQuantity = productInCart[0].quantity + req.body.quantityChange;
      await productInCart[0].update({
        quantity: newQuantity,
      });
    }
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

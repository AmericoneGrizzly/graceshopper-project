const router = require("express").Router();
const { requireToken, isAdministrator } = require("./utils");
const {
  models: { Product },
} = require("../db");
module.exports = router;

// router mounted at: /api/products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(product);
  } catch (err) {
    next(err);
  }
});

router.post("/", requireToken, isAdministrator, async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", requireToken, isAdministrator, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.update(req.body);
    res.send(product);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireToken, isAdministrator, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.send(product);
  } catch (err) {
    next(err);
  }
});

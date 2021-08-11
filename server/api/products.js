const router = require("express").Router();
const { requireToken } = require("./utils");
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

router.post("/", requireToken, async (req, res, next) => {
  try {
    //get a token here -> look up user id and perms ->
    //if ok make changes
    console.log(`req.user`, req.user);
    if (req.user.role === "ADMINISTRATOR") {
      const product = await Product.create(req.body);
      res.json(product);
    }
  } catch (err) {
    next(err);
  }
});
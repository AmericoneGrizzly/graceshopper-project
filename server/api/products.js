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
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// // router.post("/", async (req, res, next) => {
//   const currentUser = User.findByPk(req.params.id);
//   if (currentUser.role === "ADMINISTRATOR") {
//     console.log(currentUser);
//     try {
//       const product = await Product.create(req.body);
//       res.json(product);
//     } catch (err) {
//       next(err);
//     }
//   } else {
//     // res.send("THIS FUNCTIONALITY IS RESERVED FOR ADMINISTRATORS");
//     console.log("this functionality...");
//   }
// });

const router = require('express').Router()
// const { models: { Product }} = require('../db')
module.exports = router


// router mounted at: /api/products
router.get('/', (req, res, next) => {
  try {
    const products = ["productA", "productB", "productC"];
    res.send(products);
  } catch (err) {
    next(err)
  }
})

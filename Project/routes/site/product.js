var express = require('express');
var router = express.Router();
var Watches = require("../../modal/Watch")
/* GET users listing. */
router.get("/page/:page?", async (req, res) => {
  let page = Number(req.params.page) ? Number(req.params.page) : 1
  let pageSize = 8;
  let products = await Watches.find()
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  let total = await Watches.countDocuments();
  let totalPages = Math.ceil(total / pageSize);
  res.render("products", {
   products: products ,
    total,
    page,
    pageSize,
    totalPages,
  });
});
router.get('/:id', async function (req, res) {
  try {
    const products = await Watches.find().limit(10)
    const product = await Watches.findById(req.params.id)
    res.render('product-detail', { products, product });
  } catch (error) {

  }



});


module.exports = router;

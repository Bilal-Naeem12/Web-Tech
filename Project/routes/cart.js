var express = require('express');
var router = express.Router();
var Watches = require("../modal/Watch")
/* GET users listing. */
router.get('/', function(req, res) {
  res.render('cart');
});

// router.get('/:id', async function(req, res) {
//   try {
//     const products = await Watches.find().limit(10)
//     const product = await Watches.findById(req.params.id)
//     res.render('product-detail',{products,product});
//   } catch (error) {

//   }



// });
module.exports = router;

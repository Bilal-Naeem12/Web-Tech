var express = require('express');
var router = express.Router();
var Watches = require("../../modal/Watch")
var isAuthenticated = require("../../middlewares/isAuthenticated");

/* GET users listing. */
router.get('/',isAuthenticated,async function(req, res) {
  let cart = req.cookies.cart
  cartjSON = JSON.parse(cart)
  const products = await Watches.find().limit(10)
 res.render("checkout",{cartjSON,products} )
});

router.post('/',isAuthenticated,async function(req, res) {
  let cart = req.cookies.cart
  cartjSON = JSON.parse(cart)


  // Parse and log the cart if it exists
  if (cart) {
    let cartJSON = JSON.parse(cart);
    console.log(cartJSON);
  }

  // Set the cart cookie to an empty array
  res.clearCookie('cart');

  // Respond to the client
  res.send('Cart has been set to empty');
});




// });
module.exports = router;

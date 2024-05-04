var express = require('express');
var router = express.Router();
var Watches = require("../modal/Watch")
/* GET home page. */
router.get('/',async function(req, res) {
  const products = await Watches.find().limit(4)
 
  res.render('index',{products : products});
});

module.exports = router;

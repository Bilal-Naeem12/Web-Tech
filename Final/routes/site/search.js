const express = require('express');
const router = express.Router();
const Watches = require('../../modal/Watch'); // Adjust the path as necessary


router.get("/page/:page", async (req, res) => {
    console.log(req.query.search)
    let page = Number(req.params.page) ? Number(req.params.page) : 1
    let searchString = req.query.search || '';
    let pageSize = searchString? 3:16;
    
    
  // Create the search filter using a regular expression for case-insensitive search
  let searchFilter = {
    $or: [
      { title: { $regex: searchString, $options: 'i' } },
      { brand: { $regex: searchString, $options: 'i' } }
    ]
  };
    let products = await Watches.find(searchFilter)
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    let total = await Watches.countDocuments(searchFilter);
    let totalPages = Math.ceil(total / pageSize);
  if (searchString) {
    req.session.history.push(searchString)
  return  res.render("search", {
        products: products ,
         total,
         page,
         pageSize,
         totalPages,
         searchString
       });
  }
   

    res.render("products", {
        products: products ,
         total,
         page,
         pageSize,
         totalPages,
       });
  });

  

module.exports = router;

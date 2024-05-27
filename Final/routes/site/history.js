const express = require('express');
const router = express.Router();
const Watches = require('../../modal/Watch'); // Adjust the path as necessary


router.get("/", async (req, res) => {
    const {history} = req.session
    console.log(history)

    res.render("history",{history})
  });

  

module.exports = router;

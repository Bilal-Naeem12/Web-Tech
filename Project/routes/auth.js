const express = require("express");
let router = express.Router();
let User = require("../modal/User");

router.get("/signup", (req, res) => {
  res.render("signup");
});
router.post("/signup", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    // req.session.flash = {
    //   type: "danger",
    //   message: "User with given name already exist",
    // };
    res.flash("danger", "User Already Exist");
    return res.redirect("/signup");
  }
  user = new User(req.body);
  await user.save();
  console.log(user)
  res.render("login");
});
router.get("/logout", (req, res) => {
  req.session.user = null;
  res.flash("success", "Logged out Successfully");
  res.redirect("/auth/login");
});


router.get('/login',async function(req, res) {
  
    res.render('login');
  });
  router.post('/login',async function(req, res) {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.flash("danger", "User with given email donot exist");
      return res.redirect("login");
    }
    if (user.password != req.body.password) {
      res.flash("danger", "Invalid Password");
      return res.redirect("login");
    }
    req.session.user = user;
    res.flash("success", user.name + " Logged In");
    
    
    res.redirect("/");


    });
module.exports = router;
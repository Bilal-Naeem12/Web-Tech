const express = require("express");
let router = express.Router();
let User = require("../../modal/User");
let jwt = require("jsonwebtoken")
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
    return res.redirect("/auth/signup");
  }
  user = new User(req.body);
  await user.save();
  

  res.render("login");
});


router.get("/logout", (req, res) => {
  req.session.user = null;
  res.clearCookie("Authorization")
  res.clearCookie("cart")
  res.flash("success", "Logged out Successfully");
  res.redirect("/");
 
});


router.get('/login',async function(req, res) {
  
    res.render('login');
  });

  router.post('/login',async function(req, res) {
    let user = await User.findOne({ email: req.body.email });
   
    if (!user) {
      res.flash("danger", "User with given email donot exist");
      return res.redirect("/auth/login");
      
    }
    if (user.password != req.body.password) {
  
      res.flash("danger", "Invalid Password");
      return res.redirect("/auth/login");
    } 

    playload = {
      userid :user.id
    }
    try {
      const token = jwt.sign(playload,"helloooooo");
      console.log("Generated token:", token);
      // res.cookie("Authorization",token)
      res.setHeader('Authorization', `Bearer ${token}`);
  
      req.session.user = user;
    } catch (error) {
      res.send({message:"cannt authenticate"})
    }

  
  
    console.log(req.session.user)
    res.flash("success", user.name + " Logged In");
    res.redirect("/");


    });
module.exports = router;
var express = require('express');
var mongoose = require('mongoose')
var session = require("express-session");
var indexRouter = require('./routes/index');
var productRouter = require('./routes/product');
var checkoutRouter = require('./routes/checkout');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var authRouter = require('./routes/auth');

var isAuthenticated = require("./middlewares/isAuthenticated");
var siteMiddleware = require("./middlewares/siteMiddleware")
var cookieParser = require('cookie-parser');  

const Watches = require("./modal/Watch")

mongoose.connect("mongodb://127.0.0.1:27017/SemsterProject").then(()=>{
  console.log("connected")
}).catch((e)=>console.log("Error"+e))

var app = express();
app.use(express.static('public'));
// view engine setup
app.use(cookieParser());   

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(session({
  secret: "It's a secret",
  resave: false,
  saveUninitialized: true
}));
app.use(siteMiddleware);
app.use('/', indexRouter);
app.use('/products', productRouter);
app.use('/checkout', checkoutRouter);
app.use('/auth', authRouter);



app.listen(3000)
module.exports = app;

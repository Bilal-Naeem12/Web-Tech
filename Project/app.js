require('dotenv').config();
var express = require('express');
var mongoose = require('mongoose')
var session = require("express-session");
var indexRouter = require('./routes/site/index');
var productRouter = require('./routes/site/product');
var checkoutRouter = require('./routes/site/checkout');
var authRouter = require('./routes/site/auth');
var siteMiddleware = require("./middlewares/siteMiddleware")
var watchesApiRouter = require("./routes/api/watchAPI");
var  jwtAuth  = require("./middlewares/jwtAuth")
var cookieParser = require('cookie-parser');  
var MongoStore = require('connect-mongo');

mongoose.connect(process.env.MONGODB_URI).then(()=>{
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
  secret: 'yourSecretKey', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } ,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: 14 * 24 * 60 * 60 // 14 days TTL
  })
}));
app.use(siteMiddleware);





app.use("/api",jwtAuth,watchesApiRouter);

app.use('/', indexRouter);
app.use('/products', productRouter);
app.use('/checkout', checkoutRouter);
app.use('/auth', authRouter);




app.listen(process.env.PORT)

module.exports = app;

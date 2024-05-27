var express = require('express');
var mongoose = require('mongoose')
var session = require("express-session");
var indexRouter = require('./routes/site/index');
var productRouter = require('./routes/site/product');
var checkoutRouter = require('./routes/site/checkout');
var authRouter = require('./routes/site/auth');
var searchRouter = require('./routes/site/search');
var historyRouter = require('./routes/site/history');


var siteMiddleware = require("./middlewares/siteMiddleware")
var historyMiddleware = require("./middlewares/history")
var watchesApiRouter = require("./routes/api/watchAPI");
var  jwtAuth  = require("./middlewares/jwtAuth")
var cookieParser = require('cookie-parser');  


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
  secret: 'yourSecretKey', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));


app.use(siteMiddleware);
app.use(historyMiddleware);




app.use("/api",jwtAuth,watchesApiRouter);

app.use('/', indexRouter);
app.use('/products', productRouter);
app.use('/checkout', checkoutRouter);
app.use('/auth', authRouter);
app.use('/search', searchRouter);
app.use('/history', historyRouter);



app.listen(3000)
module.exports = app;

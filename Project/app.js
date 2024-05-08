var express = require('express');
var mongoose = require('mongoose')
var indexRouter = require('./routes/index');
var productRouter = require('./routes/product');
var cartRouter = require('./routes/cart');


const Watches = require("./modal/Watch")

mongoose.connect("mongodb://127.0.0.1:27017/SemsterProject").then(()=>{
  console.log("connected")
})

var app = express();
app.use(express.static('public'));
// view engine setup
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}))
app.use(express.json());


app.use('/', indexRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);


app.get("/db",async (req,res)=>{
  const ans = await Watches.find();
  
  res.send(ans)

})



app.listen(3000)
module.exports = app;

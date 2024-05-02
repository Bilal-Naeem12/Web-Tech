var express = require('express');

var indexRouter = require('./routes/index');
var productRouter = require('./routes/product');

var app = express();
app.use(express.static('public'));
// view engine setup
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}))
app.use(express.json());


app.use('/', indexRouter);
app.use('/products', productRouter);





app.listen(3000)
module.exports = app;

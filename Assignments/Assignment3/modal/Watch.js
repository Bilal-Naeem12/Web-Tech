const mongoose = require("mongoose");


let WatchSchema = mongoose.Schema({
    title: {
    type: String,
    required: true
},
image_url:  {
    type: String,
    required: true
},
  price: {
    type: Number,
    required: true
},
brand: {
    type: String,
    required: true
},
});
let Watches = mongoose.model("Watches", WatchSchema);
module.exports = Watches;
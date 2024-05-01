const mongoose = require("mongoose")

let bookSchema = mongoose.Schema({
    title: String,
    price: Number,
    author: String
})


let Books = mongoose.model("Books",bookSchema)

module.exports = Books
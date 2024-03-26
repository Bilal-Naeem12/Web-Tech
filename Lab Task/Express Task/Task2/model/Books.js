const mongoose = require("mongoose")

let bookSchema = mongoose.Schema(
    {
        title : String,
        author : String,
        copies : Number
    }
)


const Books = mongoose.model("Books",bookSchema)

module.exports = Books
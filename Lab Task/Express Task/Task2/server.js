const express = require("express")
const mongoose = require("mongoose")
const Books = require("./model/Books")
let server = express()

server.use(express.json())



mongoose.connect("mongodb://localhost:27017/books").then(()=>console.log("connected"));

server.listen(3000,()=>
{
    console.log("server is on 3000")
})


server.get("/",async (req,res)=>{
  let book = await Books.find()

  res.send(book)
})
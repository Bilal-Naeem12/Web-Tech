const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const Books = require("./models/Books")
let server = express()

server.use(express.json())
server.use(bodyParser.urlencoded({ extended: true }));
 
// Parses the text as json
server.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/testing');

server.listen(3000,()=>
{
    console.log("server is on 3000")
})

server.get("/",async (req,res)=>{
    let book = await Books.find()
    res.send(book)
})


server.get("/:id",async (req,res)=>{
    let book = await Books.findById(req.params.id)
    res.send(book)
})

server.post("/",async (req,res)=>{
    
    let book = new  Books()
    book.title = req.body.title
    book.price = req.body.price
    book.author = req.body.author
    await book.save()
    res.send("done")
})


server.put("/:id",async (req,res)=>{
    
    let book = await Books.findById(req.params.id)
    book.title = req.body.title
    book.price = req.body.price
    book.author = req.body.author
    await book.save()
    res.send("done")
})

server.delete("/:id",async (req,res)=>{
    
    const result = await Books.deleteOne(req.body.id);
    res.send(result)
})
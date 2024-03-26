const express = require('express')
let server = express()


server.set('view engine','ejs')
server.use(express.static("public"))


server.get('/',function(req,res){
res.render("index")
})

server.listen(5050)


const express = require("express");
const { mymiddleware } = require("./middlewares/firstmiddleware");
const app = express();

//middleware
// app.use(function(req, res, next){
//     console.log("Hello from first middleware")
//     next();
// })
// app.use(function(req, res, next){
//     console.log("Hello from second middleware")
//     next();
// })
// app.use(function(req, res, next){
//     console.log("Hello from thire middleware")
//     next();
// })
// app.get("/", function(req, res){
//     res.sendFile(__dirname+"/public/index.html")
// })

app.use(mymiddleware)
app.use(express.static(__dirname+"/public"))
app.use(express.static(__dirname))


app.listen(5050, "localhost", (error)=>{
    if(error){
        console.log("error", error);
    }else{
        console.log("Webserver is live on localhost:5050");
    }
})
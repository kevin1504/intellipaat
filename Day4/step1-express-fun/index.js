const express = require("express");
const app = express();

app.get("/", function(req, res){
    // res.write("<h1>Welcome to your life</h1>");
    // res.end();

    // res.send("<h1>Welcome to your life</h1>");

    // res.json();
    // res.sendFile();
    // res.render()

    res.sendFile(__dirname+"/public/index.html");
})
app.get("/about", function(req, res){
    res.sendFile(__dirname+"/public/about.html")
})
app.get("/contact", function(req, res){
    res.sendFile(__dirname+"/public/contact.html")
})
app.get("*", function(req, res){
    res.sendFile(__dirname+"/public/404.html")
})
app.listen(5050, "localhost", (error)=>{
    if(error){
        console.log("error", error);
    }else{
        console.log("Webserver is live on localhost:5050");
    }
})
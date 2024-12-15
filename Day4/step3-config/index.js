const express = require("express")
const config = require("./config.json")
const app = express();

app.get("/", (req, res)=>{
    res.send("welcome to your life")
})

//$env:PORT=5050
// console.log(process.env.PORT);

let port = process.env.PORT || config.port;
app.listen(port, "localhost", (error)=>{
    if(error){
        console.log("Error ", error)
    }else{
        console.log("web server is now live on localhost:"+port)
    }
})
const express = require("express")
const app = express();
// -------------------------
//Middleware..
app.use(express.urlencoded({extended: "extended"}));
// ------------------------------

let data = [];

app.get("/", (req, res)=>{
    res.render("home.pug", {data})
})
app.post("/", (req, res)=>{
//    console.log(req.body)
    data.push(req.body.avenger);
    // console.log(data)
    res.redirect("/")
})

app.listen(1010, "localhost", (error)=>{
    if(error){
        console.log("Error ", error);
    }
    else{
        console.log("Server is running on port:1010")
    }
})
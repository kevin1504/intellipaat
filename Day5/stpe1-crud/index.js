const express = require("express");
const config = require("./config.json");
const mongoose = require("mongoose");

const app = express();
app.use(express.static(__dirname));
app.use(express.json());
let localurl = "";
let rawurl = "mongodb+srv://{{dbuser}}:{{dbpass}}@cluster0.{{dbstring}}.mongodb.net/{{dbname}}?retryWrites=true&w=majority&appName=Cluster0";

let url = rawurl.replace("{{dbuser}}", config.dbuser)
            .replace("{{dbpass}}", config.dbpass)
            .replace("{{dbstring}}", config.dbstring)
            .replace("{{dbname}}", config.dbname);
console.log(url)
            //connect to db
mongoose.connect(url)
.then(()=> console.log("DB Connected"))
.catch((error)=> console.log("Error ", error));

// Model
let Schema = mongoose.Schema;
let ObjectId = mongoose.ObjectId;

let Friend = mongoose.model("Friend", new Schema({
    id : ObjectId,
    title : {
        type: String,
        required: true,
        unique: true
    },
    firstname : String,
    lastname : String,
    city : String,
}))

// setTimeout(function(){
//     Friend.find().then(res =>{console.log(res)}).catch(error => console.log("Error ", error))
// }, 2000);

//render the data
app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/public/index.html");
    // res.render("index.pug", {data : []})
})
//CREATE
app.post("/data", (req, res)=>{
    console.log("req", req.body);
    var friend = new Friend(req.body)
    .save()
    .then((dbres)=>{
        res.send({message : "data was added."})
    })
    .catch(error => console.log("Error ", error))
})

//READ
app.get("/data", (req, res)=>{
    Friend.find()
    .then(dbres => res.send(dbres))
    .catch(error => console.log("Error ", error))
})

//DELETE

app.delete("/delete", (req, res)=>{
//    console.log("Delete request for ", req.body._id)
    Friend.findByIdAndDelete({_id:req.body.id})
    .then((dbres)=>{
        res.send({message : "Friend delete "+dbres.title})
    })
    .catch((error)=>{ 
        console.log("Error ", error);
    })
})


app.listen(config.port, config.host, (error)=>{
    error ? console.log("Error ", error) : console.log("Server is running on ", config.host, ":", config.port);
});


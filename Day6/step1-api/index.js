const express = require("express");
const config = require("./config.json");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let localurl = "";
let rawurl = "mongodb+srv://{{dbuser}}:{{dbpass}}@cluster0.{{dbstring}}.mongodb.net/{{dbname}}?retryWrites=true&w=majority&appName=Cluster0";

let url = rawurl.replace("{{dbuser}}", config.dbuser)
    .replace("{{dbpass}}", config.dbpass)
    .replace("{{dbstring}}", config.dbstring)
    .replace("{{dbname}}", config.dbname);
// console.log(url)
//connect to db
mongoose.connect(url)
    .then(() => console.log("DB Connected"))
    .catch((error) => console.log("Error ", error));

// Model
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let Friend = mongoose.model("Friend", new Schema({
    id: ObjectId,
    title: {
        type: String
    },
    firstname: String,
    lastname: String,
    city: String,
}))

/* setTimeout(function(){
    Friend.find().then(res => console.log(res)).catch(error => console.log("Error ", error))
}, 2000); */

// render the data
// app.get("/", (req, res) => {
//     res.sendFile(__dirname+"/public/index.html");
//     // res.render("index.pug",{data : []})
// });
// CREATE
app.post("/data", (req, res) => {
    console.log("req", req.body);
    var friend = new Friend(req.body)
        .save()
        .then((dbres) => {
            res.send({ message: "data was added" })
        })
        .catch((error) => {
            console.log("Error", error)
        })
})
// cors options

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// READ
app.get("/data", cors(corsOptions), (req, res) => {
    Friend
        .find()
        .then(dbres => res.send(dbres))
        .catch(error => console.log("Error ", error))
});
// READ BEFORE UPDATE
app.get("/edit/:fid", (req, res) => {
    // console.log(req.params.fid);
    Friend.findById({ _id: req.params.fid })
        .then((dbres) => { res.send(dbres) })
        .catch((error) => { console.log("Error", error) })
});

// UPDATE
app.post("/edit/:fid", (req, res) => {
    Friend.findByIdAndUpdate({ _id: req.params.fid }, {
        title: req.body.title,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        city: req.body.city,
    })
        .then((dbres) => {
            res.send({ message: "data was updated" })
        })
        .catch((error) => {
            console.log("Error", error)
        })
})

// DELETE
app.delete("/delete", (req, res) => {
    // console.log("Delete request for ", req.body._id)
    Friend.findByIdAndDelete({ _id: req.body.id })
        .then((dbres) => { res.send({ message: "user deleted" }) })
        .catch((error) => { console.log("Error", error) })
});

app.listen(config.port, config.host, (error) => {
    error ? console.log("Error ", error) : console.log("Server is now live on ", config.host, ":", config.port)
})
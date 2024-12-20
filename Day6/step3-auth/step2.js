const express = require("express");
const mongoose = require("mongoose");
const config = require("./config.json")

//app configuration
const app = express();
//middleware configuration
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: "extended" }));

//database configuration
let rawurl = "mongodb+srv://{{dbuser}}:{{dbpass}}@cluster0.{{dbstring}}.mongodb.net/{{dbname}}?retryWrites=true&w=majority&appName=Cluster0";

let url = rawurl.replace("{{dbuser}}", config.dbuser)
    .replace("{{dbpass}}", config.dbpass)
    .replace("{{dbstring}}", config.dbstring)
    .replace("{{dbname}}", config.dbname);

//model configuration
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;
//ORM
let User = mongoose.model("User", new Schema({
    id: ObjectId,
    firstname: String,
    lastname: String,
    email: {
        type: String,
        unique: true
    },
    password: String
}))

//db connection
mongoose.connect(url)
    .then(() => console.log("DB Connected"))
    .catch((error) => console.log("Error ", error));

app.get("/", function (req, res) {
    res.render("home.pug")
})
app.get("/login", function (req, res) {
    res.render("login.pug")
})
app.get("/register", function (req, res) {
    res.render("register.pug")
})
app.post("/register", function (req, res) {
    let user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    });
    user.save()
        .then((dbres) => {
            res.redirect("/profile");
            console.log("User is registered")
        })
        .catch((error) => {
            let errorMessage = "";
            if (error.code == 11000) {
                errorMessage = "Email id already exists."
            } else {
                errorMessage = "Something went wrong"
            }
            res.render("register.pug", { errorMessage })
        })
})
app.get("/profile", function (req, res) {
    res.render("profile.pug")
})
app.get("/logout", function (req, res) {
    res.redirect("/")
})



app.listen(3000, "localhost", function (error) {
    if (error) {
        console.log("Error ", error);
    } else {
        console.log("server is live on localhost:3000");
    }
})
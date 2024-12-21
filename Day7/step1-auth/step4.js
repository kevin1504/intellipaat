const express = require("express");
const mongoose = require("mongoose");
const config = require("./config.json")
const session = require("client-sessions");
const bcrypt = require("bcrypt");

//app configuration
const app = express();
//middleware configuration
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: "extended" }));
app.use(session({
    cookieName: 'intellipaat', // cookie name dictates the key name added to the request object
    secret: 'ertghbvdsw34r5t6yuy6543wsdcvghyt654e3wsdft5r4w345tyhbvfdsw2345tgvc', // should be a large unguessable string
    duration: 30 * 60 * 1000, // how long the session will stay valid in ms
    activeDuration: 10 * 60 * 1000, // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
    cookie: {
        ephemeral: true
    }
}))

//logs
// console.log("hash for 1 time " + bcrypt.hashSync("a", bcrypt.genSaltSync(1)));

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
app.post("/login", function (req, res) {
    User.findOne({ email: req.body.email })
        .then((dbres) => {
            //check password to match the user's password
            if (bcrypt.compareSync(req.body.password, dbres.password)) {
                req.intellipaat.user = dbres;
                res.redirect("/profile")
            } else {
                res.render("login.pug", { errorMessage: "Invalid password" })
            }
        })
        .catch((error) => {
            res.render("login.pug", { errorMessage: "No user by that credentials" })
        })
})
app.get("/register", function (req, res) {
    res.render("register.pug")
})
app.post("/register", function (req, res) {
    let hashpass = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(1));
    let user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashpass
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
    // res.render("profile.pug");
    if (req.intellipaat && req.intellipaat.user) {
        User.findOne({ email: req.intellipaat.user.email })
            .then(dbres => {
                res.render("profile.pug");
                // if (!dbres) {
                //     req.intellipaat.reset();
                //     res.redirect("/login")
                // } else {
                // }
            })
            .catch(error => {
                req.intellipaat.reset();
                res.redirect("/login")
            })
    } else {
        res.redirect("/login")
        req.intellipaat.reset();
    }
})
app.get("/logout", function (req, res) {
    req.intellipaat.reset();
    res.redirect("/")
})



app.listen(3000, "localhost", function (error) {
    if (error) {
        console.log("Error ", error);
    } else {
        console.log("server is live on localhost:3000");
    }
})
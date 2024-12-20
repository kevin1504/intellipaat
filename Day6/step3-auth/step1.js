const express = require("express");
const app = express();
app.use(express.static(__dirname));

app.get("/", function (req, res) {
    res.render("home.pug")
})
app.get("/login", function (req, res) {
    res.render("login.pug")
})
app.get("/register", function (req, res) {
    res.render("register.pug")
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
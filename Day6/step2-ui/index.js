const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));


app.listen(3000, "localhost", (error) => {
    if (error) {
        console.log("Error ", error)
    } else {
        console.log("Server is now live on localhost: 3000");
    }
})
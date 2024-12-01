const express = require("node:express")
let app = express();

app.get("/", (req, res)=>{

    res.write("Welcome to your life!");
    res.end();
})
app.listen(5050, "localhost")
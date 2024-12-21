const express = require('express')
const app = express()
const port = 3000
const server = require("http").createServer(app);
const io = require("socket.io")(server);

//config
app.use(express.static(__dirname));

io.on("connection", function (server) {
    console.log("client connected");
    setInterval(function () {
        server.emit("message", { "message": "Hello client " + new Date().getMilliseconds() })
    }, 2000);
    server.on("clientmessage", function (evt) {
        console.log(evt);
    });
    server.on("disconnect", function () {
        console.log("client disconnected")
    })
})

server.listen(port, "localhost", () => console.log(`Example app listening on port ${port}!`))
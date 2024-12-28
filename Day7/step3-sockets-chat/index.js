const express = require('express')
const app = express()
const port = 3000
const http = require("http").createServer(app);
const io = require("socket.io")(http);

//config
app.use(express.static(__dirname));
app.use(express.static(__dirname + "/public"))

io.on("connection", function (socket) {
    socket.on("clientMessage", data => {
        io.emit("serverMessage", data);
    });
})
io.on("disconnect", function (socket) {
    // socket.on("clientMessage", data => {
    //     io.emit("serverMessage", data);
    // })
    console.log("client disconnected");
})

http.listen(port, "localhost", () => console.log(`Example app listening on port ${port}!`))
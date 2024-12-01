const { error } = require("node:console");
const http = require("node:http")

let server = http.createServer((req, res) => {
    // res.write("Welcome!");
    res.write(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>`)
    res.end();
})

server.listen(5050, "localhost", (error)=>{
    if(error){console.log("Error ", error)}
    else{
        console.log("Server is running on localhost:5050")
    }
})
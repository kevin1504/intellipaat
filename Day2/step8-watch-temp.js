let fs = require("node:fs");

fs.watchFile("temp.txt",function(){
    console.log("file was updated");
})
let EventEmitter = require("node:events").EventEmitter;

let myEvent = new EventEmitter();

myEvent.addListener("vjEvent", vjEventHandler);
// myEvent.emit("vjEvent");

function vjEventHandler(){
    console.log("vjEvent Happened");
};

/* 
setTimeout(function(){
    myEvent.emit("vjEvent");
},2000); 
*/

// myEvent.emit("vjEvent");
// myEvent.emit("vjEvent");
// myEvent.emit("vjEvent");
// myEvent.emit("vjEvent");

setInterval(function(){
    myEvent.emit("vjEvent");
},1000); 

/* 
assignment 2

call this event once every second for 10 times only
*/
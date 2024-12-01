const axios = require("axios")
const fs = require("node:fs")

console.log("log from line 4", process.argv)
let domain = process.argv[2]

axios.get(`https://${domain}.com`)
.then((res)=>{

    // console.log(res.data);
    fs.writeFile(`${domain}.html`, res.data, "utf-8",function(err, data){
        if(err){
            console.log("Error ", err)
        }else{
            console.log("File is created")
        }
    })
})
.catch((error)=>{
    console.log("Error ", error)
})
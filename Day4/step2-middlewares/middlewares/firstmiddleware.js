let mymiddleware = function(req, res, next){
    console.log("URL ", req.url);
    next();
}

module.exports = {mymiddleware}
var Util = function(){};

Util.prototype.generateUUID = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
     var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
     return v.toString(16);
    });
};

Util.prototype.isRequestAuthenticated = function(req, res, next){

   if(req.isAuthenticated()){
    		return next();
    }
    res.statusMessage = "Unauthorized";
    res.status(403).json("Unauthorized");
};

module.exports = new Util();
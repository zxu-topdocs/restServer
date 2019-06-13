function checkToken(req,res,next){
    console.log('Head=' + req.body);
    next();
}

module.exports = checkToken;
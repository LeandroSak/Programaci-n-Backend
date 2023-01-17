const authMiddleware = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
       
    }
    res.redirect('/signin')
   
}

module.exports = authMiddleware;
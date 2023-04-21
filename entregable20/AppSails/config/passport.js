const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy
      
     
      const md5 = require('md5')
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});
passport.deserializeUser(function(id, cb){
  User.findOne({id}, function(err, users) {
    cb(err, users);
  });
});
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function(username, password, cb){
    const userData =  User.findOne({username,password:md5(password)});
    if(!userData){
        return cb(null,false);
    }
    cb(null, userData);
}))
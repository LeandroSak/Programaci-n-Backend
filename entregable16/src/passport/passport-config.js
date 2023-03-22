const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../../database/mongoDB/models/user-model.js')
const md5 = require('md5')


const initPassport =()=>{
    passport.use('login', new LocalStrategy(async (username, password, done) =>{
        const userData = await UserModel.findOne({username,password:md5(password)});
        if(!userData){
            return done(null,false);
        }
        done(null, userData);
    }));
}

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, password, done)=>{
    const userData = await UserModel.findOne({username});
    if(userData){
        return done(null,false);
    }
    const stageUser = new UserModel({
        username,
        password:md5(password)
    });
    const newUser = await stageUser.save();
    done(null,newUser);
}));

passport.serializeUser((user,done)=>{
    done(null,user._id);
});

passport.deserializeUser(async(id,done) =>{
    const userData = await UserModel.findById(id);
    done(null,userData);
});


module.exports = initPassport
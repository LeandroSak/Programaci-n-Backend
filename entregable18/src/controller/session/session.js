const passport = require('passport');

const logger = require("../../logger/logger.js")

const signin = async (req,res) =>{
    if(req.isAuthenticated()){
        logger.log("info", "Usuario conectado");
        return res.redirect('/');
    }
    res.render('pages/signin');
}

const signinn = async (req,res) =>{
    logger.log("info", "Usuario conectado");
    res.redirect('/')   
}

const logout = async (req,res) =>{
    try {
        const name = req.user.username
        req.logout(err => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                })
            }
            logger.log("info", "Usuario desconectado");
            res.render('pages/logout', { name: name })
        });
    } catch (error) {
        logger.log("error", error.message);
        res.status(400).json({
            response: "error",
            error: error.message
            
        })
    }
}

const signup = async (req,res) =>{
    if(req.isAuthenticated()){
        logger.log("info", "Usuario conectado");
        return res.redirect('/');
    }
    res.render('pages/signup');
}

const signupp = async (req,res) =>{
    logger.log("info", "Usuario registrado");
    res.redirect('/')
}

const errorsignin = async (req,res) =>{
    logger.log("warn", "Error al iniciar sesion");
    res.render('pages/error', {message: "User Error SignIn"});
}

const errorsignup = async (req,res) =>{
    logger.log("warn", "Error al registrarse");
    res.render('pages/error', {message: "User Error SignUp"});
}

module.exports = {
    signin,
    signinn,
    logout,
    signup,
    signupp,
    errorsignin,
    errorsignup
}
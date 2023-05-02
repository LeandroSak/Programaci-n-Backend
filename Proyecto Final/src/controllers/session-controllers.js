import logger from '../logger/logger.js';

export const signIn = async (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
   res.render('pages/signin');
}

export const signInn = async (req, res) => {
    res.redirect('/productos')   
}

export const logout = async (req, res,) => {
    try {
        const name = req.user.username
        req.logout(err => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                })
            }
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

export const signUpp = async (_req,res)=>{
    res.redirect('/productos')
}

export const signUp =  async (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    res.render('pages/signup');
}

export const errorSignin = async (_req, res) =>{
    logger.log("warn", "Error al iniciar sesion");
    res.render('pages/error', {message: "User Error SignIn"});
}

export const errorSignup = async (_req, res) =>{
    logger.log("warn", "Error al registrarse");
    res.render('pages/error', {message: "User Error SignUp"});
}

export const Informacion = async (req,res)=>{
    const userData = req.user;
    try {
        
     res.status(200).render('pages/info',{user:userData})
        
    } catch (error) {
        logger.log("error", error.message);
    }
}


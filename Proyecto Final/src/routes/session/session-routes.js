import express from 'express'
import passport from 'passport'
import logger from '../../logger/logger.js';

const router = express.Router();


router.get('/signin', async (req, res) => {
     if(req.isAuthenticated()){
         return res.redirect('/');
     }
    res.render('pages/signin');
})
router.post('/signinn', passport.authenticate('login', {failureRedirect: '/errorsignin'}), async (req, res) => {
    res.redirect('/productos')   
})
router.get('/signup', async (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    res.render('pages/signup');
})

router.get('/logout', async (req, res,) => {
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
})

router.post('/signupp', passport.authenticate('signup',{failureRedirect: '/errorsignup'}),async (_req,res)=>{
    res.redirect('/productos')
})

router.get('/errorsignin', async (_req, res) =>{
    logger.log("warn", "Error al iniciar sesion");
    res.render('pages/error', {message: "User Error SignIn"});
})

router.get('/errorsignup', async (_req, res) =>{
    logger.log("warn", "Error al registrarse");
    res.render('pages/error', {message: "User Error SignUp"});
})

router.get('/informacion', async (req,res)=>{
    const userData = req.user;
    try {
        
     res.status(200).render('pages/info',{user:userData})
        
    } catch (error) {
        logger.log("error", error.message);
    }
})


export default router
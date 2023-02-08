const express = require('express');
const passport = require('passport');

const router = express.Router();


router.get('/signin', async (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    res.render('pages/signin');
})
router.post('/signinn', passport.authenticate('login', {failureRedirect: '/errorsignin'}), async (req, res) => {
    res.redirect('/')   
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
        res.status(400).json({
            response: "error",
            error: error.message
        })
    }
})

router.get('/signup', async (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    res.render('pages/signup');
})

router.post('/signupp', passport.authenticate('signup',{failureRedirect: '/errorsignup'}),async (_req,res)=>{
    res.redirect('/')
})

router.get('/errorsignin', async (_req, res) =>{
    res.render('pages/error', {message: "User Error SignIn"});
})

router.get('/errorsignup', async (_req, res) =>{
    res.render('pages/error', {message: "User Error SignUp"});
})


module.exports = router;
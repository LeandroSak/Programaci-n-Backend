const express = require('express');
const passport = require('passport');

const router = express.Router();
const UserModel = require('../../../database/mongoDB/models/user-model')



router.get('/signin', async (_req, res) => {
    res.render('pages/signin');
})
router.post('/signinn', passport.authenticate('login', {failureRedirect: '/error'}), async (req, res) => {
    res.redirect('/')   
})

router.get('/logout', async (req, res,) => {
    try {
        const name = req.session.user
        req.session.destroy(err => {
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

router.get('/signup', async (_req, res) => {
    res.render('pages/signup');
})

router.post('/signupp', passport.authenticate('signup',{failureRedirect: '/error'}),async (req,res)=>{
    console.log(req.user)
    res.redirect('/')
})



module.exports = router;
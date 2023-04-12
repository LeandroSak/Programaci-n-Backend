const express = require('express');
const passport = require('passport');
const router = express.Router();
const logger = require("../../logger/logger.js")
const {signin, signinn, logout, signup, signupp, errorsignin, errorsignup} = require("../../controller/session/session.js")

router.get('/signin', signin)

router.post('/signinn', passport.authenticate('login', {failureRedirect: '/errorsignin'}), signinn)

router.get('/logout', logout)

router.get('/signup', signup)

router.post('/signupp', passport.authenticate('signup',{failureRedirect: '/errorsignup'}),signupp)

router.get('/errorsignin', errorsignin)

router.get('/errorsignup', errorsignup)


module.exports = router;
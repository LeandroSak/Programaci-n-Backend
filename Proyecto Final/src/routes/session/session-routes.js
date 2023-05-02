import express from 'express'
import passport from 'passport'
const router = express.Router();
import {Informacion,errorSignin,errorSignup,signIn,signInn,signUp,signUpp,logout} from '../../controllers/session-controllers.js'


router.get('/signin', signIn)
router.post('/signinn', passport.authenticate('login', {failureRedirect: '/errorsignin'}), signInn)
router.get('/signup',signUp)

router.get('/logout', logout)

router.post('/signupp', passport.authenticate('signup',{failureRedirect: '/errorsignup'}), signUpp)

router.get('/errorsignin',errorSignin )

router.get('/errorsignup', errorSignup)

router.get('/informacion', Informacion)


export default router
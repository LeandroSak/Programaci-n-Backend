const express = require('express');
const sessionRoutes = require('./session/session-routes')
const authMiddleware = require('../middlawares/auth')

const router = express.Router();

const mockTest = require("../../storage/faker")
const mock = new mockTest()

router.get('/',authMiddleware,async (req, res) => {
    try{
        res.status(200).render('pages/index', { root: __dirname, name: req.session.user });
    }catch(error){
        res.status(400).json({
            response: "error",
            error: error.message
        })
    }
})


router.get('/productos-test', async (_req, res) => {
    try {
        const products = await mock.getRandomMock();
        res.status(200).render('pages/productos', { listProducts: products, listExist: true })
    } catch (error) {
        res.status(400).json({
            response: "error",
            error: error.message
        })
    }
})

router.use('/', sessionRoutes)


module.exports = router;
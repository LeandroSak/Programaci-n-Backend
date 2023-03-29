const express = require('express');
const sessionRoutes = require('./session/session-routes')
const authMiddleware = require('../routes/middlawares/auth')
const router = express.Router();

const { inicio, testProductos , infoo, randomm,dataa} = require('../controller/index.js');

router.get('/', authMiddleware, inicio)

router.get('/productos-test', testProductos)

router.get('/info', infoo)

router.get('/random', randomm)

router.get("/data", dataa)

router.use('/', sessionRoutes)


module.exports = router;
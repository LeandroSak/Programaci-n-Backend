const express = require('express');
const sessionRoutes = require('./session/session-routes')
const authMiddleware = require('../routes/middlawares/auth')
const router = express.Router();
const cont = require("../negocio/contenedor")
const contenedor = new cont()
const { inicio, testProductos , infoo, randomm,dataa, agregar, producto} = require('../controller/index.js');

router.get('/', authMiddleware, inicio)

router.get('/productos-test', testProductos)

router.get('/info', infoo)

router.get('/random', randomm)

router.get("/data", dataa)

router.use('/', sessionRoutes)

router.use("/agregar", agregar)

router.use('/producto/:id', producto)


module.exports = router;
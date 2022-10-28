const express = require("express")
const router = express.Router()
const products = require('./products-routes')

router.use('/productos', products)



module.exports = router
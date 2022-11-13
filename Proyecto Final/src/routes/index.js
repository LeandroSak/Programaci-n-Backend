const express = require("express")
const router = express.Router()
const products = require('./products/products-routes')
const cart = require('./cart/cart-routes')

router.use('/productos', products)
router.use('/carrito', cart)



module.exports = router
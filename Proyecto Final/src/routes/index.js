import express from 'express'
const router = express.Router()
import products from './products/products-routes.js'
import cart from './cart/cart-routes.js'

router.use('/productos', products)
router.use('/carrito', cart)



export default router
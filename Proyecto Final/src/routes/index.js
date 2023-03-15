import express from 'express'
const router = express.Router()
import products from './products/products-routes.js'
import cart from './cart/cart-routes.js'
import sessionRoutes from './session/session-routes.js'
import authMiddleware from '../middlewares/auth.js'
router.get('/',authMiddleware,async (req, res) => {
    res.redirect('/productos')
})
router.use('/productos', products)
router.use('/carrito', cart)
router.use('/', sessionRoutes)


export default router
import express from 'express'
const router = express.Router()
import {deleteCart,addProdCart,deleteProdCart,listProdCart, compraCart, createCart} from "../../controllers/cart-controllers.js"


router.post('', createCart)

router.delete('/:id', deleteCart)

router.post('/:id/productos/:id_prod', addProdCart)

router.delete('/:id/productos/:id_prod', deleteProdCart)

router.get('/:id/productos', listProdCart)

router.post('/:id/compra', compraCart)

export default router
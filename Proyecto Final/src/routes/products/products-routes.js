import express from 'express'
const router = express.Router()
import authMiddleware from '../../middlewares/auth.js'
import validAdmin from '../../middlewares/validAdmin.js';
import {getProd,prodRandom,getProds,cargaPage,deleteProd,editProd,editPage,addProd} from "../../controllers/product-controllers.js"

router.get('/',authMiddleware, getProds )

router.get('/productoRandom', prodRandom)

router.get('/carga',authMiddleware,validAdmin,cargaPage )

router.get('/:id', getProd)

router.post('', addProd)

router.delete('/:id',validAdmin, deleteProd)

router.get('/editar/:id',authMiddleware,validAdmin, editPage)

router.put('/editar/:id',validAdmin, editProd)



export default router
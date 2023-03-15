import express from 'express'
const router = express.Router()
import ProductClass from "../../daos/productos/contenedorMongo.js";
const contenedor = new ProductClass()
import authMiddleware from '../../middlewares/auth.js'
import CartClass from '../../daos/carritos/cartMongo.js'
const carrito = new CartClass()
import validAdmin from '../../middlewares/validAdmin.js';

router.get('/',authMiddleware, async(req,res, next)=>{
    try{
        const userData = req.user;
        const cart = await carrito.getByIdAndUser(userData._id)
        const time = new Date().toLocaleString();
        let carri 
        if (cart !=null){
            carri = cart
        }else{
            carri = await carrito.save(time,userData._id)
        }
        const products = await contenedor.getAll()
        res.render('pages/productos',{user:userData,lista: products, carrito:carri})
    }catch(error){
        next(error)
    }
})

router.get('/productoRandom', async(_req,res, next)=>{
    try{
        const products = await contenedor.getAll()
        const random = products[Math.floor(Math.random()*products.length)]
        res.status(200).send(random)
    }catch(error){
        next(error)
    }
})

router.get('/carga',authMiddleware,validAdmin, async(req,res, next)=>{
    try{
        res.render('pages/cargaproductos')
    }catch(error){
        next(error)
    }
})


router.get('/:id', async(req,res,next)=>{
    let {id} = req.params
    try{
        const products = await contenedor.getById(id)
        if(products){
            res.status(200).json(products)
        }else{
            res.status(404).json({
            error:`el producto con id: ${id} no existe`
        })
        }
    }catch(error){
       next(error)
    }
})

router.post('', async(req,res,next)=>{
    try{
        const time = new Date().toLocaleString(); 
        const products = await contenedor.save(req.body,time );
        res.redirect('/productos')
    }catch(error){
        next(error)
    }
})

router.delete('/:id',validAdmin,async(req,res,next)=>{
    let {id} = req.params
    try{
        const products = await contenedor.deleteById(id)
        if(products){
            res.render('pages/mensaje', {message: `El producto ${products.title}, id: ${products.id} a sido eliminado`});
        }else{
            res.status(404).json({
            error:`el producto con id: ${id} no existe`
        })
        }      
    }catch(error){
        next(error)
    }
})

router.get('/editar/:id',authMiddleware,validAdmin, async(req,res, next)=>{
    let {id} = req.params
    try{
         const products = await contenedor.getById(id)
        res.render('pages/editproducto', {product: products})
    }catch(error){
        next(error)
    }
})

router.put('/editar/:id',validAdmin,async(req,res,next)=>{
    let {id} = req.params
    try{
        const products = await contenedor.putById(id,req.body)
        if(products){
            res.render('pages/mensaje', {message: `El producto ${products.title}, id: ${products.id} a sido modificado`});
        }else{
            res.status(400).render('pages/mensaje', {message: `El producto no existe`});
        }
    }catch(error){
       next(error)
    }
})



export default router
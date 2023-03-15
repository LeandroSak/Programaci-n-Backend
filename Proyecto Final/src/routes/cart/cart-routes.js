import express from 'express'
const router = express.Router()
import CartClass from '../../daos/carritos/cartMongo.js'
const carrito = new CartClass()
import ProductClass from "../../daos/productos/contenedorMongo.js";
const contenedor = new ProductClass()


router.post('', async (req, res, next) => {
    try {
        const time = new Date().toLocaleString();
        const cart = await carrito.save(time)
        res.status(200).json({
            message: `Se creo carrito con id: ${cart}`
        })
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    let { id } = req.params
    try {
        const carts = await carrito.deleteById(id)
        if (carts) {
            res.status(200).json({
                message: `Se elimino carrito con id: ${carts}`
            })
        } else {
            res.status(404).json({
                error: `el carrito con id: ${id} no existe`
            })
        }
    } catch (error) {
        next(error)
    }
})


router.post('/:id/productos/:id_prod', async (req, res, next) => {
    let { id, id_prod } = req.params
    try {
        const cart = await carrito.getById(id)
        const product = await contenedor.getById(id_prod)
        if (cart) {
            if (product) {
                const carrit = await carrito.putById(id, product)
                res.status(200).render('pages/mensaje', {message: `El producto ${product.title}, se agrego al carrito`});
            } else {
                res.status(404).json({
                    error: `el producto con id: ${id_prod} no existe`
                })
            }
        } else {
            res.status(404).json({
                error: `el carrito con id: ${id} no existe`
            })
        }

    } catch (error) {
        next(error)
    }
})

router.delete('/:id/productos/:id_prod', async (req, res, next) => {
    let { id, id_prod } = req.params
    try {
        const cart = await carrito.getById(id)
        const product = await contenedor.getById(id_prod)
        if (cart) {
            if (product) {
                const carrit = await carrito.deleteProdById(id, id_prod)
                if(carrit != null){
                res.status(200).render('pages/mensaje', {message: `El producto ${product.title}, se elimino del carrito`});
            }else{
                res.status(404).json({
                    error: `el producto con id: ${id_prod} no se encuentra en el carrito`
                })
            }
            } else {
                res.status(404).json({
                    error: `el producto con id: ${id_prod} no existe`
                })
            }
        } else {
            res.status(404).json({
                error: `el carrito con id: ${id} no existe`
            })
        }

    } catch (error) {
        next(error)
    }
})

router.get('/:id/productos', async (req, res, next) => {
    let { id } = req.params
    const userData = req.user;
    try {
        const productos = await carrito.getAllProd(id)
        if (productos !=null) {
            res.status(200).render('pages/carrito',{user:userData,lista: productos})
        } else {
            res.status(404).json({
                error: `el carrito con id: ${id} no existe`
            })
        }
    } catch (error) {
        next(error)
    }
})

router.get('/', async (req, res, next) => {
    try {

        const carritos = await carrito.getAll()
        if (carritos) {
            res.status(200).json(carritos)
        } else {
            res.status(404).json({
                error: `el carrito con id: ${id} no existe`
            })
        }
    } catch (error) {
        next(error)
    }
})

router.post('/:id/compra', async (req, res, next) => {
    let { id } = req.params
    const userData = req.user;
    try {
        const carts = await carrito.putByIdCompra(id, userData)
        
        if (carts) {
            res.status(200).render('pages/mensaje', {message: `Se realizo la compra con exito, Muchas gracias`});
            
        } else {
            res.status(404).json({
                error: `el carrito con id: ${id} no existe`
            })
        }
    } catch (error) {
        next(error)
    }
})

export default router
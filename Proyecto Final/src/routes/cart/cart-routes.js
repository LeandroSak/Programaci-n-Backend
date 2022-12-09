import express from 'express'
const router = express.Router()
import {CartClass} from '../../daos/index.daos.carritos.js'
const carrito = new CartClass()
import {ProductClass} from "../../daos/index.daos.productos.js";
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
                res.status(200).json(carrit)
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
                res.status(200).json(carrit)
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
    try {
        const productos = await carrito.getAllProd(id)
        if (productos !=null) {
            res.status(200).json(productos)
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

export default router
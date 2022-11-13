const express = require("express")
const router = express.Router()
const cart = require("../../../storage/cart")
const carrito = new cart()
const cont = require("../../../storage/contenedor")
const contenedor = new cont()


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

router.get('/:id/productos', async (req, res, next) => {
    let { id } = req.params
    try {
        const productos = await carrito.getAllProd(id)
        if (productos) {
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

module.exports = router
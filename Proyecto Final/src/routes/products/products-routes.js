const express = require("express")
const router = express.Router()
const valid = require('../../middlewares/validAdmin')
const cont=require("../../../storage/contenedor")
const contenedor = new cont()



router.get('/', async(_req,res, next)=>{
    try{
        const products = await contenedor.getAll()
        res.status(200).json(products)
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
        const products = await contenedor.save(req.body,time )
        
        res.status(200).json({
            message:`Se agrego producto con id: ${products}`
        })
    }catch(error){
        next(error)
    }
})

router.delete('/:id', valid,async(req,res,next)=>{
    // ejemplo http://localhost:8080/api/productos/2?admin=true
    let {id} = req.params
    try{
        const products = await contenedor.deleteById(id)
        if(products){
            res.status(200).json({
                message:`Se elimino producto con id: ${products}`
            })
        }else{
            res.status(404).json({
            error:`el producto con id: ${id} no existe`
        })
        }      
    }catch(error){
        next(error)
    }
})

router.put('/:id', valid,async(req,res,next)=>{
    // ejemplo http://localhost:8080/api/productos/2?admin=true
    let {id} = req.params
    try{
        const products = await contenedor.putById(id,req.body)
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



module.exports = router
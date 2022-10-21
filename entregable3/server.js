const express = require ("express");
const cont=require("./contenedor.js")
const contenedor = new cont()
const app = express()

const PORT = 8080

app.get('/productos', async(_req,res)=>{
    try{
        const products = await contenedor.getAll()
        res.status(200).json(products)
    }catch{
        console.log('error',error)
    }
})

app.get('/productoRandom', async(_req,res)=>{
    try{
        const products = await contenedor.getAll()
        const random = products[Math.floor(Math.random()*products.length)]
        res.status(200).send(random)
    }catch{
        console.log('error',error)
    }
})

app.listen(PORT, () =>{
    console.info("server up and running")
})
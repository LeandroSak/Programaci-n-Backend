import ProductClass from "../daos/index.daos.productos.js"
const contenedor = new ProductClass()
import CartClass from '../daos/carritos/cartMongo.js'
const carrito = new CartClass()



export const getProds = async(req,res, next)=>{
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
}

export const prodRandom = async(_req,res, next)=>{
    try{
        const products = await contenedor.getAll()
        const random = products[Math.floor(Math.random()*products.length)]
        res.status(200).send(random)
    }catch(error){
        next(error)
    }
}

export const cargaPage = async(req,res, next)=>{
    try{
        res.render('pages/cargaproductos')
    }catch(error){
        next(error)
    }
}

export const getProd = async(req,res,next)=>{
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
}

export const addProd = async(req,res,next)=>{
    try{
        const time = new Date().toLocaleString(); 
        const products = await contenedor.save(req.body,time );
        res.redirect('/productos')
    }catch(error){
        next(error)
    }
}

export const deleteProd = async(req,res,next)=>{
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
}

export const editProd = async(req,res,next)=>{
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
}

export const editPage = async(req,res, next)=>{
    let {id} = req.params
    try{
         const products = await contenedor.getById(id)
        res.render('pages/editproducto', {product: products})
    }catch(error){
        next(error)
    }
}


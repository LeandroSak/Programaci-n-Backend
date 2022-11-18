validAdmin=(req,res,next)=>{
  
    if(req.query.admin)
        next()
    else
        res.send( { error :  -1, descripcion: " ruta no autorizada" })
}
module.exports = validAdmin
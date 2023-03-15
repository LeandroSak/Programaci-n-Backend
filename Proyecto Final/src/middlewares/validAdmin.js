const validAdmin=(req,res,next)=>{
    const userData = req.user;
    if(userData.clase=="admin")
        next()
    else
        res.send( { error :  -1, descripcion: " ruta no autorizada" })
}
export default validAdmin
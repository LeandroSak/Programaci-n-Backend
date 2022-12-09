let errorHandler = (error,_req,res,_next) =>{
    res.status(400).json({
        response: "error",
        error: error.message
    })
}

export default errorHandler
import logger from "../logger/logger.js";

let errorHandler = (error,_req,res,_next) =>{
    logger.log("error", error.message);
    res.status(400).json({
        response: "error",
        error: error.message
    })
}

export default errorHandler
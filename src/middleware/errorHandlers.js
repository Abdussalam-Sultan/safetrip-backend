import logger from "../utils/loggers.js";

//express allows you to take four arguments while handling error.
export default function errorHandler(err, req, res, next){
    const statusCode = err.statusCode || 500;
    console.log(err.stack);

if(statusCode >= 500){
    logger.fatal({
        message: err.message,
        stack: err.stack,
        statusCode: err.statusCode,
        data: err.data || null
    });
};

    res.status(statusCode).json ({success: true, 
        message: err.message || 
        "Internal Server Error",
        data: err.data || null
    }); 
}
//now lets plug our error handler into our project

//Creating services for error handling
export default class AppError extends Error{
    constructor(message, statuscode = 500, data = null){
        super(message);
        this.statuscode = statuscode;
        this.data = data;
        this.isOperational = true
    }
}
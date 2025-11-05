class AppError extends Error {
    constructor(message, statuscode = 500, data = null) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.data = data;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    };
};

export default AppError;


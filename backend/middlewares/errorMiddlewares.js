function errorMiddleware(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: message,
        errorCode: err.errorCode || 'UNKNOWN_ERROR',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
}

export { errorMiddleware };
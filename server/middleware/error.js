const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal server error";
  err.stack = err.stack;

  // Wrong Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}, \n ${err.stack}`;
    err = new ErrorHandler(message, 400);
  }

  // duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHandler(message, 400);
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHandler(message, 400);
  }

  // Check if error is an instance of ErroHandler
  if (err instanceof ErrorHandler) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
      reason: err.stack,
    });
  } else {
    // Handle other types of errors
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: err.message,
      reason: err.stack,
    });
  }
};

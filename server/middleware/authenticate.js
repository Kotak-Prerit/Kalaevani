const jwt = require("jsonwebtoken");
const ErroHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ErroHandler("Please login to access this resource", 401));
  }

  const token = authHeader.split(" ")[1]; // Extracting token from "Bearer <token>"

  const decodedData = jwt.verify(token, process.env.JWT_KEY);
  req.user = await User.findById(decodedData.id);

  next();
});

exports.authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErroHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};

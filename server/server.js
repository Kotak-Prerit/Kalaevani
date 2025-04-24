const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDB = require("./config/database");
const getRazorpayInstance = require("./config/razorpay");
// const cors = require("cors");

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Load environment variables first
dotenv.config({ path: "server/config/config.env" });

// Connect to database
connectDB();

// Initialize Razorpay
try {
  getRazorpayInstance();
} catch (error) {
  console.error("Failed to initialize Razorpay:", error);
  process.exit(1);
}

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// Start server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is connect on PORT ${process.env.PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});

module.exports = getRazorpayInstance;
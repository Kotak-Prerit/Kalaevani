const Razorpay = require("razorpay");

let razorpayInstance = null;

const initializeRazorpay = () => {
    if (!process.env.RAZORPAY_API_KEY || !process.env.RAZORPAY_SECRET) {
        throw new Error(
            "Razorpay configuration missing. Please set RAZORPAY_API_KEY and RAZORPAY_SECRET environment variables."
        );
    }

    try {
        razorpayInstance = new Razorpay({
            key_id: process.env.RAZORPAY_API_KEY,
            key_secret: process.env.RAZORPAY_SECRET,
        });
        console.log("Razorpay initialized successfully");
        return razorpayInstance;
    } catch (error) {
        console.error("Failed to initialize Razorpay:", error);
        throw error;
    }
};

const getRazorpayInstance = () => {
    if (!razorpayInstance) {
        return initializeRazorpay();
    }
    return razorpayInstance;
};

module.exports = getRazorpayInstance; 
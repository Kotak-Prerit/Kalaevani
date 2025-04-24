const catchAsyncErrors = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const getRazorpayInstance = require("../config/razorpay");
const crypto = require("crypto");

// Process payment
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return next(new ErrorHandler("Amount is required", 400));
    }

    const razorpay = getRazorpayInstance();
    const options = {
      amount: Number(amount * 100),
      currency: "INR",
      payment_capture: 1,
      notes: {
        company: "Kalaevani",
      },
    };

    const myPayment = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order_id: myPayment.id,
      amount: myPayment.amount,
      currency: myPayment.currency,
      payStatus: "created",
      myPayment,
    });
  } catch (error) {
    console.error("Payment processing error:", error);
    return next(new ErrorHandler(error.message || "Payment processing failed", 500));
  }
});

// Send Razorpay API Key
exports.sendRazorpayApiKey = catchAsyncErrors(async (req, res, next) => {
  try {
    if (!process.env.RAZORPAY_API_KEY) {
      return next(new ErrorHandler("Razorpay API key not configured", 500));
    }

    res.status(200).json({
      razorpayApiKey: process.env.RAZORPAY_API_KEY,
    });
  } catch (error) {
    console.error("Error sending Razorpay API key:", error);
    return next(new ErrorHandler("Could not send Razorpay API key", 500));
  }
});

// Verify payment
exports.verifyPayment = catchAsyncErrors(async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return next(new ErrorHandler("Missing payment verification parameters", 400));
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (razorpay_signature !== expectedSignature) {
      return next(new ErrorHandler("Invalid payment signature", 400));
    }

    const razorpay = getRazorpayInstance();
    // Verify payment status
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (payment.status !== "captured") {
      return next(new ErrorHandler(`Payment not completed. Status: ${payment.status}`, 400));
    }

    // Verify order details
    const order = await razorpay.orders.fetch(razorpay_order_id);

    if (order.status !== "paid") {
      return next(new ErrorHandler(`Order not paid. Status: ${order.status}`, 400));
    }

    res.status(200).json({
      success: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return next(new ErrorHandler(error.message || "Payment verification failed", 500));
  }
});
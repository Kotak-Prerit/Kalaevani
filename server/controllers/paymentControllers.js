const catchAsyncError = require("../middleware/catchAsyncError");
const Razorpay = require("razorpay");
const crypto = require("crypto");

exports.processPayment = catchAsyncError(async (req, res, next) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
    payment_capture: 1,
    notes: {
      company: "Kalaevani",
    },
  };

  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

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
    res.status(500).json({
      success: false,
      error: "Payment processing failed",
      message: error.message,
    });
  }
});

exports.sendRazorpayApiKey = catchAsyncError(async (req, res) => {
  res.status(200).json({ razorpayApiKey: process.env.RAZORPAY_API_KEY });
});

exports.verifyPayment = catchAsyncError(async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Missing payment details" });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res.json({ success: true, paymentId: razorpay_payment_id });
    }

    // Check payment status with Razorpay API
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    // Ensure payment is captured
    if (payment.status !== "captured") {
      return res
        .status(400)
        .json({ success: false, message: "Payment not completed" });
    }

    res.status(200).json({ success: true, paymentId: razorpay_payment_id });
  } catch (error) {
    next(error);
  }
});

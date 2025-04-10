const express = require("express");
const {
  processPayment,
  sendRazorpayApiKey,
  verifyPayment,
} = require("../controllers/paymentControllers");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/authenticate");

router.route("/process/payment").post(isAuthenticatedUser, processPayment);
router.route("/razorpayapikey").get(isAuthenticatedUser, sendRazorpayApiKey);
router.route("/verify").post(isAuthenticatedUser, verifyPayment);

module.exports = router;

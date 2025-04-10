const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    houseNo: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },

    phoneNo: {
      type: Number,
      required: true,
    },
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },

      image: {
        type: String,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    razor_order_id: {
      type: String,
      required: true,
    },
    razorpay_payment_id: {
      type: String,
      required: true,
    },
    razorpay_signature: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "Online"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending",
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  paidAt: {
    type: Date,
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);

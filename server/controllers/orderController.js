const Order = require("../models/orderModels");
const Product = require("../models/productmodel");
const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    paymentStatus,
    amountPaid,
  } = req.body;

  // Validating payment status for online orders
  if (paymentMethod === "Online" && paymentStatus !== "Paid") {
    return next(new ErrorHander("Payment not completed", 400));
  }

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    paymentStatus,
    amountPaid,
    paidAt: paymentMethod === "Online" ? Date.now() : undefined,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user  Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHander("You have already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    for (let i = 0; i < order.orderItems.length; i++) {
      const items = order.orderItems[i];
      await updateStock(items);
    }
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(order) {
  const product = await Product.findById(order.product);

  const updatedSizes = [...product.sizes].map((item) => {
    if (item.name === order.size) {
      item.quantity -= order.quantity;
    }
    return item;
  });
  await Product.findByIdAndUpdate(
    order.product,
    {
      sizes: updatedSizes,
      Stock: product.Stock - order.quantity,
    },
    { new: true }
  );
}

// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});

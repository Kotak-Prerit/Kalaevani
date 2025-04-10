const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  productDetails,
  createProductReview,
  getProductReviews,
  deleteReviews,
  getAdminProducts,
} = require("../controllers/productController");
const {
  isAuthenticatedUser,
  authorizeRole,
} = require("../middleware/authenticate");
const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRole("admin"), getAdminProducts);

router
  .route("/admin/products/new")
  .post(isAuthenticatedUser, authorizeRole("admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRole("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteProduct);

router.route("/product/:id").get(productDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReviews);

module.exports = router;

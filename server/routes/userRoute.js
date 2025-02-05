const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUSer,
  logout,
  resetForgottenPassword,
  sendForgotPasswordOtp,
  getUserDetails,
  changePassword,
  changeProfile,
  getAllUsers,
  deleteUser,
  updateUserRole,
  getSingleUser,
} = require("../controllers/userController");
const {
  isAuthenticatedUser,
  authorizeRole,
} = require("../middleware/authenticate");

router.route("/register").post(registerUser);
router.route("/login").post(loginUSer);
router.route("/password/forgot").post(sendForgotPasswordOtp);
router.route("/password/reset").post(resetForgottenPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/change").put(isAuthenticatedUser, changePassword);
router.route("/me/change").put(isAuthenticatedUser, changeProfile);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRole("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRole("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRole("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteUser);
module.exports = router;

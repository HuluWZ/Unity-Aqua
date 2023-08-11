const express = require("express");
const UserServices = require("../services/user_services");
const router = express.Router();

const validate = require("../middlewares/validate");
const errorHandler = require("../configs/error_handler_config");
const verifyToken = require("../middlewares/verify_token");

// const signUpSchema = require("../validators/user/signup_validator");
// const loginSchema = require("../validators/user/login_validator");

router.post(
  "/signup",
  //   validate(signUpSchema)
  errorHandler(UserServices.signUp)
);
router.post("/login", errorHandler(UserServices.login));
// router.get("/verify", errorHandler(UserServices.verifyOtp));
router.get("/", verifyToken, errorHandler(UserServices.userProfile));
router.post("/forgot", errorHandler(UserServices.changePassword));
router.get("/all", verifyToken, errorHandler(UserServices.getAllUsers));
router.post(
  "/change",
  verifyToken,
  errorHandler(UserServices.changeUserStatus)
);
// router.post(
//   "/transaction",
//   verifyToken,
//   errorHandler(UserServices.userTransaction)
// );
router.delete("/delete/:id", errorHandler(UserServices.deleteUser));

module.exports = router;

const express = require("express");
const UserServices = require("../services/user_services");
const router = express.Router();

const validate = require("../middlewares/validate");
const errorHandler = require("../configs/error_handler_config");
const verifyToken = require("../middlewares/verify_token");
const {
  uploadMultipleImage,
  uploadMultipleLabImage,
} = require("../middlewares/fileUpload");


router.post("/signup",uploadMultipleLabImage,errorHandler(UserServices.signUp));
router.post("/login", errorHandler(UserServices.login));
// router.get("/verify", errorHandler(UserServices.verifyOtp));
router.get("/", verifyToken, errorHandler(UserServices.userProfile));
router.get("/get/:id", errorHandler(UserServices.findUser));
router.post("/forgot", errorHandler(UserServices.changePassword));
router.get("/all", errorHandler(UserServices.getAllUsers));
router.post(
  "/change",
  verifyToken,
  errorHandler(UserServices.changeUserStatus)
);
router.put("/approve/:id",verifyToken, errorHandler(UserServices.approveUser));

// router.post(
//   "/transaction",
//   verifyToken,
//   errorHandler(UserServices.userTransaction)
// );
router.delete("/delete/:id", errorHandler(UserServices.deleteUser));

module.exports = router;

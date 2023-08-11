const express = require("express");
const MarketServices = require("../services/market_services");
const router = express.Router();

const errorHandler = require("../configs/error_handler_config");
const verifyToken = require("../middlewares/verify_token");

router.get(
  "/",
  verifyToken,
  //   validate(signUpSchema)
  errorHandler(MarketServices.getAllZones)
);
module.exports = router;

const express = require("express");
const FarmerServices = require("../services/farmer_services");
const router = express.Router();

const validate = require("../middlewares/validate");
const errorHandler = require("../configs/error_handler_config");
const verifyToken = require("../middlewares/verify_token");


router.post("/", verifyToken,errorHandler(FarmerServices.createFarmer));
router.get("/find/:id", errorHandler(FarmerServices.findFarmer));
router.get("/", errorHandler(FarmerServices.findFarmerAll));
router.get("/:phone", errorHandler(FarmerServices.findFarmerFromPhone));
router.delete("/delete/:id", errorHandler(FarmerServices.deleteFarmer));

module.exports = router;

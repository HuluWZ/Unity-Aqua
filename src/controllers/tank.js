const express = require("express");
const TankServices = require("../services/tank_services");
const router = express.Router();

const validate = require("../middlewares/validate");
const errorHandler = require("../configs/error_handler_config");
const verifyToken = require("../middlewares/verify_token");

router.post("/", errorHandler(TankServices.createTank));
router.get("/farmer/:id", errorHandler(TankServices.findTankFarmer));
router.get("/find/:id", errorHandler(TankServices.findTank));
router.get("/", errorHandler(TankServices.findTankAll));
router.get("/:phone", errorHandler(TankServices.findFarmerTankFromPhone));
router.delete("/delete/:id", errorHandler(TankServices.deleteTank));

module.exports = router;

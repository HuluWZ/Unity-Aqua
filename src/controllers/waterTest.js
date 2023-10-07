const express = require("express");
const WaterTestService = require("../services/sample_service/water_test_services");
const router = express.Router();

const errorHandler = require("../configs/error_handler_config");

// Fish Test
router.get("/", errorHandler(WaterTestService.getAllWater));
router.post("/", errorHandler(WaterTestService.createWater));
router.put("/:id", errorHandler(WaterTestService.updateWater));
router.get("/:id", errorHandler(WaterTestService.getWater));
router.delete("/:id", errorHandler(WaterTestService.deleteWater));

module.exports = router;

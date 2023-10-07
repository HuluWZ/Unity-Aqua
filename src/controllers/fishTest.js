const express = require("express");
const FishTestService = require("../services/sample_service/fish_test_services");
const router = express.Router();

const errorHandler = require("../configs/error_handler_config");

// Fish Test
router.get("/", errorHandler(FishTestService.getAllFish));
router.post("/", errorHandler(FishTestService.createFish));
router.put("/:id", errorHandler(FishTestService.updateFish));
router.get("/:id", errorHandler(FishTestService.getFish));
router.delete("/:id", errorHandler(FishTestService.deleteFish));

module.exports = router;
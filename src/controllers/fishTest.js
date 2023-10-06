const express = require("express");
const FishTest = require("../services/fish_test_services");
const router = express.Router();

const errorHandler = require("../configs/error_handler_config");

// Fish Test
router.get("/", errorHandler(FishTest.getAllFish));
router.post("/", errorHandler(FishTest.createFish));
router.put("/:id", errorHandler(FishTest.updateFish));
router.get("/:id", errorHandler(FishTest.getFish));
router.delete("/:id", errorHandler(FishTest.deleteFish));

module.exports = router;
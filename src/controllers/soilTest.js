const express = require("express");
const SoilTestService = require("../services/sample_service/soil_test_services");
const router = express.Router();

const errorHandler = require("../configs/error_handler_config");

// Soil Test
router.get("/", errorHandler(SoilTestService.getAllSoil));
router.post("/", errorHandler(SoilTestService.createSoil));
router.put("/:id", errorHandler(SoilTestService.updateSoil));
router.get("/:id", errorHandler(SoilTestService.getSoil));
router.delete("/:id", errorHandler(SoilTestService.deleteSoil));

module.exports = router;

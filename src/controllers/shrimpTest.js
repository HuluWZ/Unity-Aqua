const express = require("express");
const ShrimpTestServices = require("../services/sample_service/shrimp_test_services");
const router = express.Router();

const errorHandler = require("../configs/error_handler_config");

// Shrimp Test
router.get("/", errorHandler(ShrimpTestServices.getAllShrimp));
router.post("/", errorHandler(ShrimpTestServices.createShrimp));
router.put("/:id", errorHandler(ShrimpTestServices.updateShrimp));
router.get("/:id", errorHandler(ShrimpTestServices.getShrimp));
router.delete("/:id", errorHandler(ShrimpTestServices.deleteShrimp));

module.exports = router;

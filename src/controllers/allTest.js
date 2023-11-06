const express = require("express");
const AllTestService = require("../services/sample_service/all_test_services");
const router = express.Router();

const errorHandler = require("../configs/error_handler_config");

// Culture Test
router.get("/", errorHandler(AllTestService.getAllTest));
router.post("/", errorHandler(AllTestService.createTest));
router.put("/approve/:id", errorHandler(AllTestService.approveTest));
router.put("/:id", errorHandler(AllTestService.updateTest));
router.get("/:id", errorHandler(AllTestService.getTest));
router.delete("/:id", errorHandler(AllTestService.deleteTest));

module.exports = router;

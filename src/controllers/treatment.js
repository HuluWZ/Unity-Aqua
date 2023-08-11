const express = require("express");
const TreatmentService = require("../services/treatment_services");
const router = express.Router();

const errorHandler = require("../configs/error_handler_config");
const verifyToken = require("../middlewares/verify_token");

// SECTOR
router.post(
  "/sector",
  verifyToken,
  errorHandler(TreatmentService.createSector)
);
router.get("/sector", errorHandler(TreatmentService.getAllSectors));

// PROBLEM
router.post(
  "/problem",
  verifyToken,
  errorHandler(TreatmentService.createProblem)
);
router.get("/problem", errorHandler(TreatmentService.getAllProblems));

// TREATMENT
router.post("/", verifyToken, errorHandler(TreatmentService.createTreatment));
router.get("/", errorHandler(TreatmentService.getAllTreatments));
router.get("/my", verifyToken, errorHandler(TreatmentService.findMyTreatments));
router.get(
  "/import",
  verifyToken,
  errorHandler(TreatmentService.importTreatment)
);
router.post(
  "/farmer",
  verifyToken,
  errorHandler(TreatmentService.createTreatmentFramer)
);

module.exports = router;

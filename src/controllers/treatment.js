const express = require("express");
const TreatmentService = require("../services/treatment_services");
const router = express.Router();
const { uploadMultipleImage } = require("../middlewares/fileUpload");

const errorHandler = require("../configs/error_handler_config");
const verifyToken = require("../middlewares/verify_token");

// SECTOR
router.post(
  "/sector",
  errorHandler(TreatmentService.createSector)
);
router.get("/sector", errorHandler(TreatmentService.getAllSectors));
router.put("/sector/:id", errorHandler(TreatmentService.updateSector));

// PROBLEM
router.post(
  "/problem",
  verifyToken,
  errorHandler(TreatmentService.createProblem)
);
router.get("/problem", errorHandler(TreatmentService.getAllProblems));
router.get("/problem/sector/:id", errorHandler(TreatmentService.getProblemBySector));

// TREATMENT
router.post("/", verifyToken,uploadMultipleImage, errorHandler(TreatmentService.createTreatment));
router.get("/", errorHandler(TreatmentService.getAllTreatments));
router.delete("/:id", errorHandler(TreatmentService.deleteTreatment));

router.get("/:problemId", errorHandler(TreatmentService.getTreatments));
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
router.get(
  "/farmer/all",
  errorHandler(TreatmentService.getAllFarmers)
);
router.get(
  "/farmer/:id",
  errorHandler(TreatmentService.getFarmers)
);

router.put(
  "/farmer/:id",
  errorHandler(TreatmentService.approveFarmer)
);
router.delete(
  "/farmer/:id",
  errorHandler(TreatmentService.deleteFarmer)
);


module.exports = router;

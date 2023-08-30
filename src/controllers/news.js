const express = require("express");
const NewsServices = require("../services/news_services");
const router = express.Router();
const { uploadImage } = require("../middlewares/fileUpload");
const errorHandler = require("../configs/error_handler_config");
const verifyToken = require("../middlewares/verify_token");

router.post(
  "/",
  verifyToken,
  uploadImage,
  //   validate(signUpSchema)
  errorHandler(NewsServices.create)
);
router.get("/search", errorHandler(NewsServices.searchNews));
router.get("/:id", errorHandler(NewsServices.getNew));
router.get("/", errorHandler(NewsServices.getAllNews));
router.delete("/:id", errorHandler(NewsServices.deleteNews));
router.put("/:id", errorHandler(NewsServices.updateNews));

module.exports = router;

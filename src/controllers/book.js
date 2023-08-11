const express = require("express");
const BookServices = require("../services/book_services");
const router = express.Router();
const { uploadImage,uploadPDF,uploadBookandCover } = require("../middlewares/fileUpload");
const errorHandler = require("../configs/error_handler_config");
const verifyToken = require("../middlewares/verify_token");

router.post(
  "/",
  verifyToken,
  uploadBookandCover,
  //   validate(signUpSchema)
  errorHandler(BookServices.create)
);
router.get("/search", errorHandler(BookServices.searchBooks));
router.get("/", errorHandler(BookServices.getAllBooks));
router.get("/:id", errorHandler(BookServices.getBook));
router.delete("/:id", errorHandler(BookServices.deleteBook));
router.put("/:id", errorHandler(BookServices.updateBook));
router.get("/filter/:id",errorHandler(BookServices.filterBooks));
module.exports = router;

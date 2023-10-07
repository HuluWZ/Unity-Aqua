const express = require("express");
const FeedTestService = require("../services/sample_service/feed_test_services");
const router = express.Router();

const errorHandler = require("../configs/error_handler_config");

// Feed Test
router.get("/", errorHandler(FeedTestService.getAllFeed));
router.post("/", errorHandler(FeedTestService.createFeed));
router.put("/:id", errorHandler(FeedTestService.updateFeed));
router.get("/:id", errorHandler(FeedTestService.getFeed));
router.delete("/:id", errorHandler(FeedTestService.deleteFeed));

module.exports = router;

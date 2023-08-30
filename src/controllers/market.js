const express = require("express");
const MarketServices = require("../services/market_services");
const router = express.Router();

const errorHandler = require("../configs/error_handler_config");
const verifyToken = require("../middlewares/verify_token");

router.get(
  "/all",
  errorHandler(MarketServices.getAllMarket)
);
router.get(
  "/",
  verifyToken,
  //   validate(signUpSchema)
  errorHandler(MarketServices.getAllZones)
);
//MARTKET
router.post(
  "/",
  errorHandler(MarketServices.createMarket)
);
router.put(
  "/:id",
  errorHandler(MarketServices.updateMarket)
);
router.get(
  "/:id",
  errorHandler(MarketServices.getMarket)
);
router.delete(
  "/:id",
  errorHandler(MarketServices.deleteMarket)
);

//MARKET ZONE
router.post(
  "/zone/",
  errorHandler(MarketServices.createMarketZone)
);
router.put(
  "/zone/:id",
  errorHandler(MarketServices.updateMarketZone)
);
router.get(
  "/zone/:id",
  errorHandler(MarketServices.getMarketZone)
);
router.delete(
  "/zone/:id",
  errorHandler(MarketServices.deleteMarketZone)
);
router.get(
  "/zone/all",
  errorHandler(MarketServices.getAllMarketZone)
);

module.exports = router;

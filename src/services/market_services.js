const ApiResponse = require("../configs/api_response");
const MarketType = require("../models/market/market_type");
const MarketZone = require("../models/market/market_zone");

const getAllZones = async (req, res) => {
  const { marketId } = req.query;
  if (!marketId) return ApiResponse.error(res, "Market ID Not Found", 200);
  //Creating Video
  let zones = await MarketZone.findAll({
    where: { marketId },
    include: MarketType,
  });

  if (!zones) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, zones);
};

module.exports = {
  getAllZones,
};

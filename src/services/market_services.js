const ApiResponse = require("../configs/api_response");
const MarketType = require("../models/market/market_type");
const MarketZone = require("../models/market/market_zone");
const Market = require("../models/market/market");

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

const createMarket = async (req, res) => {
  const { name } = req.body;
  if (!name) return ApiResponse.error(res, "Name Not Added", 200);
  //Creating Video
  let zones = await Market.create({
    name: name
  });

  if (!zones) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, zones);
};
const createMarketZone = async (req, res) => {
  const { name,rate,count,marketId } = req.body;
  //Creating Video
  let zones = await MarketZone.create({
    name,
    rate,
    count,
    marketId
  });

  if (!zones) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, zones);
};
const updateMarket = async (req, res) => {
  const { id } = req.params;
  const [updatedRowsCount, updatedRows] = await Market.update(
      { name:req.body.name },
      { where: { id }, returning: true }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Market not found' });
    }
  return ApiResponse.success(res, "Updated Successfully");
};

const updateMarketZone = async (req, res) => {
  const { id } = req.params;
  const data = req.body
  const [updatedRowsCount, updatedRows] = await MarketZone.update(
      { data },
      { where: { id }, returning: true }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Market  Zone not found' });
    }
  return ApiResponse.success(res, "Updated Successfully");
};

const getMarket = async (req, res) => {
  const { id } = req.params;
  const market = await Market.findByPk(id );
    if (!market) {
      return res.status(404).json({ error: 'Market not found' });
    }

  return ApiResponse.success(res, market);
};

const getMarketZone = async (req, res) => {
  const { id } = req.params;
  const market = await MarketZone.findByPk(id, {
    include: Market,
  }
 );
    if (!market) {
      return res.status(404).json({ error: 'Market Zone not found' });
    }

  return ApiResponse.success(res, market);
};
const getAllMarket = async (req, res) => {
   const market = await Market.findAll({
   });
    if (!market) {
      return res.status(404).json({ error: 'Market  not found' });
    }

  return ApiResponse.success(res, market);
};
const getAllMarketZone = async (req, res) => {
  
  const market = await MarketZone.findAll({
     include:Market
  });
  console.log(" Market ", market);
  if (!market) {
      return res.status(404).json({ error: 'Market Zone not found' });
  }

  return ApiResponse.success(res, market);
};
const deleteMarket = async (req, res) => {
  const { id } = req.params;
  const  updatedRows = await Market.destroy(
      { where: { id } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Market not found' });
    }

  return ApiResponse.success(res, "Deleted Sucessfully");
};
const deleteMarketZone = async (req, res) => {
  const { id } = req.params;
  const  updatedRows = await MarketZone.destroy(
      { where: { id } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Market Zone not found' });
    }

  return ApiResponse.success(res, "Deleted Sucessfully");
};
module.exports = {
  getAllZones,
  createMarket,
  createMarketZone,
  updateMarket,
  updateMarketZone,
  getMarket,
  getMarketZone,
  getAllMarket,
  getAllMarketZone,
  deleteMarket,
  deleteMarketZone,
};

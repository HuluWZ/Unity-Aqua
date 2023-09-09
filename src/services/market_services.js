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
  const existingMarketType = await Market.findOne({
    where: {
      name: name,
    },
  });

  if (existingMarketType) {
    return ApiResponse.error(res, "Market Name already exist", 400);
  }
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
  const existingMarketType = await MarketZone.findOne({
    where: {
      name: name,
    },
  });

  if (existingMarketType) {
    return ApiResponse.error(res, "Market Zone Name already exist", 400);
  }
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
const createMarketType = async (req, res) => {
  const { name,rate,count,marketZoneId } = req.body;
  const existingMarketType = await MarketType.findOne({
        where: {
          name: name,
        },
      });

    if (existingMarketType) {
      return ApiResponse.error(res, "Market Type Name already exist", 400);     
    }

  const marketType = await MarketType.find({name:name});
  //Creating Video
  let zones = await MarketType.create({
    name,
    rate,
    count,
    marketZoneId
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
       data ,
      { where: { id }, returning: true }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Market  Zone not found' });
    }
  return ApiResponse.success(res, "Updated Successfully");
};

const updateMarketType = async (req, res) => {
  const { id } = req.params;
  const data = req.body
  console.log(id," Body")
  const [updatedRowsCount, updatedRows] = await MarketType.update(
       data ,
      { where: { id }, returning: true }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Market  Type not found' });
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
const getMarketType = async (req, res) => {
  const { id } = req.params;
  const market = await MarketType.findByPk(id, {
    include: [{ model: MarketZone ,include:Market }]
  }
 );
    if (!market) {
      return res.status(404).json({ error: 'Market Type not found' });
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
const getAllMarketType = async (req, res) => {
  
  const market = await MarketType.findAll({
    include: [{ model: MarketZone ,include:Market }]
  });
  console.log(" Market ", market);
  if (!market) {
      return res.status(404).json({ error: 'Market Type not found' });
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
const deleteMarketType = async (req, res) => {
  const { id } = req.params;
  const  updatedRows = await MarketType.destroy(
      { where: { id } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Market Type not found' });
    }

  return ApiResponse.success(res, "Deleted Sucessfully");
};


// 
const findAllMarketZoneFromMarket = async (req, res) => {
  const { id } = req.params;
  const market = await MarketZone.findAll({
    where: {marketId:id},
    include:Market
  }
 );
    if (!market) {
      return res.status(404).json({ error: 'No Market Zone with this Market ID not found' });
    }

  return ApiResponse.success(res, market);
};
const findAllMarketTypeFromMarketZone = async (req, res) => {
  const { id } = req.params;
  const market = await MarketType.findAll({
    where: {marketZoneId:id},
    include: [{ model: MarketZone, include:Market }]
  }
 );
    if (!market) {
      return res.status(404).json({ error: 'No Market Type with this Market  Zone ID not found' });
    }

  return ApiResponse.success(res, market);
};
const findAllMarketTypeFromMarket = async (req, res) => {
  const { id } = req.params;
  const market = await MarketType.findAll({
      include: [
      {
        model: MarketZone,
        where:{ marketId:id},
        include: [Market]
        }
      ]

  }
 );
    if (!market) {
      return res.status(404).json({ error: 'No Market Type with this Market  ID not found' });
    }

  return ApiResponse.success(res, market);
};

const findAllMarketTypeFromBoth = async (req, res) => {
  const { zoneId,typeId } = req.params;
  console.log(" Zone Id and TypeID ",zoneId,typeId);
  const market = await MarketType.findAll({
    where: { marketZoneId: zoneId,id: typeId },
    include: [{ model: MarketZone, include: Market }],
  });
  
  if (!market) {
    return res
      .status(404)
      .json({ error: "No Market Type with this Market  Zone ID not found" });
  }

  return ApiResponse.success(res, market);
};

module.exports = {
  getAllZones,
  createMarket,
  createMarketZone,
  createMarketType,
  updateMarket,
  updateMarketZone,
  updateMarketType,
  getMarket,
  getMarketZone,
  getMarketType,
  getAllMarket,
  getAllMarketZone,
  getAllMarketType,
  deleteMarket,
  deleteMarketZone,
  deleteMarketType,
  findAllMarketZoneFromMarket,
  findAllMarketTypeFromMarketZone,
  findAllMarketTypeFromMarket,
  findAllMarketTypeFromBoth,
};

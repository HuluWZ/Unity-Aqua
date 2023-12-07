const ApiResponse = require("../../configs/api_response");
const AllTest = require("../../models/sample/test");
const Tank = require("../../models/tank");
const Farmer = require("../../models/farmer");
const User = require("../../models/user");
const { Op } = require("sequelize");
const CultureTest = require("../../models/sample/cultureTest");
const FeedTest = require("../../models/sample/feedTest");
const FishTest = require("../../models/sample/fishTest");
const PCRTest = require("../../models/sample/pcrTest");
const ShrimpTest = require("../../models/sample/shrimpTest");
const SoilTest = require("../../models/sample/soilTest");
const WaterTest = require("../../models/sample/waterTest");

const createTest= async (req, res) => {
  const { body } = req;
  const twelveHoursAgo = new Date(new Date() - 12 * 60 * 60 * 1000); // 12 hour
  const condition = {
    tankId: body?.tankId,
    type: body?.type,
    createdAt: {
      [Op.gt]: twelveHoursAgo, 
    }
  }
  const isAlreadyExist = await AllTest.findOne({where:condition});
  if(isAlreadyExist){
    return ApiResponse.error(res, "Test with this Tank  already exist or wait 12 hours", 200);
  }
  let news = await AllTest.create(body);
  if (!news) return ApiResponse.error(res, "Something Went Wrong", 403);
  return ApiResponse.success(res, news);
};

const getAllTest= async (req, res) => {
  const allTypes = ["Water", "Fish", "Shrimp", "Soil", "PCR", "Feed","Culture"];
  const typeResults = {};
  const promises = allTypes.map(async (type) => {
  const tests = await AllTest.findAll({
    where: {
       type: type,
       status: "1"
     },
     order: [["createdAt", "DESC"]],
     include: [{ model: Tank, include: [{ model: Farmer, include: User }] }],
    });
    typeResults[type.toLowerCase()] = tests;
  });
  await Promise.all(promises);

  return ApiResponse.success(res, typeResults);
};

const getAllReportingTest= async (req, res) => {
  const allTypes = ["Water", "Fish", "Shrimp", "Soil", "PCR", "Feed","Culture"];
  const typeResults = {};
  const promises = allTypes.map(async (type) => {
  const tests = await AllTest.findAll({
    where: {
       type: type,
       status: "2"
     },
     order: [["createdAt", "DESC"]],
     include: [{ model: Tank, include: [{ model: Farmer, include: User }] }],
    });
    typeResults[type.toLowerCase()] = tests;
  });
  await Promise.all(promises);

  return ApiResponse.success(res, typeResults);
};

const getAllCompleteTest= async (req, res) => {
 async function findComplete(model) {
   return await model.findAll({
     where: { status: "2" },
     order: [["createdAt", "DESC"]],
     include: [
       { model: AllTest },
       { model: Tank, include: [{ model: Farmer, include: User }] },
     ],
   });
 }

 const water = await findComplete(WaterTest);
 const fish = await findComplete(FishTest);
 const shrimp = await findComplete(ShrimpTest);
 const soil = await findComplete(SoilTest);
 const pcr = await findComplete(PCRTest);
 const feed = await findComplete(FeedTest);
 const culture = await findComplete(CultureTest);
return ApiResponse.success(res, {water,fish,shrimp,soil,pcr,feed,culture});
};
const getTest= async (req, res) => {
  const { id } = req.params;
  let newsList = await AllTest.findByPk(id, {
    include: [{ model: Tank, include: [{ model: Farmer, include: User }] }],
  });
  if (!newsList) return ApiResponse.error(res, "Something Went Wrong", 200);
  return ApiResponse.success(res,newsList);
};

const deleteTest= async (req, res) => {
  const { id } = req.params;
  if (!id) return ApiResponse.error(res, "TestID Not Found", 400);
  let newsList = await AllTest.destroy({ where: { id: id } });
  if (newsList == 0) return ApiResponse.error(res, "Something Went Wrong", 200);
  return ApiResponse.success(res, newsList);
};

const updateTest= async (req, res) => {
  const { id } = req.params;
  var { body } = req;
  if (!id) return ApiResponse.error(res, "TestID Not Found", 400);
  let newsList = await AllTest.update(body, {
    where: { id: id },
  });
  if (!newsList) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};
const approveTest= async (req, res) => {
  const { id } = req.params;
  var  body  = {status :"2"};

  if (!id) return ApiResponse.error(res, "TestID Not Found", 400);
  let newsList = await AllTest.update(body, {
    where: { id: id },
  });
  if (!newsList) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};

const completeTest= async (req, res) => {
  const { id } = req.params;
  var  body  = {status :"3"};

  if (!id) return ApiResponse.error(res, "TestID Not Found", 400);
  let newsList = await AllTest.update(body, {
    where: { id: id },
  });
  if (!newsList) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};
module.exports = {
  createTest,
  getAllTest,
  getTest,
  deleteTest,
  updateTest,
  approveTest,
  completeTest,
  getAllReportingTest,
  getAllCompleteTest
};

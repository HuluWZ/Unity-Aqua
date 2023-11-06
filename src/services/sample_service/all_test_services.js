const ApiResponse = require("../../configs/api_response");
const AllTest = require("../../models/sample/test");
const Tank = require("../../models/tank");
const Farmer = require("../../models/farmer");
const User = require("../../models/user");
const { Op } = require("sequelize");

const createTest= async (req, res) => {
  const { body } = req;
  let news = await AllTest.create(body);
  if (!news) return ApiResponse.error(res, "Something Went Wrong", 200);
  return ApiResponse.success(res, news);
};

const getAllTest= async (req, res) => {
  const allTypes = ["Water", "Fish", "Shrimp", "Soil", "PCR", "Feed"];
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
module.exports = {
  createTest,
  getAllTest,
  getTest,
  deleteTest,
  updateTest,
  approveTest,
};

const ApiResponse = require("../../configs/api_response");
const ShrimpTest = require("../../models/sample/shrimpTest");
const Tank = require("../../models/Tank");
const Farmer = require("../../models/farmer");
const User = require("../../models/user");

const createShrimp = async (req, res) => {
  const { body } = req;
  let news = await ShrimpTest.create(body);

  if (!news) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, news);
};

const getAllShrimp = async (req, res) => {
  let newsList = await ShrimpTest.findAll({
    order: [["createdAt", "DESC"]],
    include: [{ model: Tank, include: [{ model: Farmer, include: User }] }],
  });

  if (!newsList) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};
const getShrimp = async (req, res) => {
  const { id } = req.params;
  let newsList = await ShrimpTest.findByPk(id, { 
    include: [{model:Tank,include:[{model:Farmer,include:User}]}],
  });

  if (!newsList) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};

const deleteShrimp = async (req, res) => {
  const { id } = req.params;
  if (!id) return ApiResponse.error(res, "Shrimp ID Not Found", 400);
  let newsList = await ShrimpTest.destroy({ where: { id: id } });

  if (newsList == 0) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};

const updateShrimp = async (req, res) => {
  const { id } = req.params;
  var { body } = req;

  if (!id) return ApiResponse.error(res, "Shrimp ID Not Found", 400);
  let newsList = await ShrimpTest.update(body, {
    where: { id: id },
  });

  if (!newsList) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};

module.exports = {
  createShrimp,
  getAllShrimp,
  getShrimp,
  deleteShrimp,
  updateShrimp,
};

const ApiResponse = require("../../configs/api_response");
const WaterTest = require("../../models/sample/waterTest");
const Tank = require("../../models/tank");

const createWater = async (req, res) => {
  const { body } = req;
  let news = await WaterTest.create(body);

  if (!news) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, news);
};

const getAllWater = async (req, res) => {
  let newsList = await WaterTest.findAll({
    order: [["createdAt", "DESC"]],
    include: Tank,
  });

  if (!newsList) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};
const getWater = async (req, res) => {
  const { id } = req.params;
  let newsList = await WaterTest.findByPk(id, { include: Tank });

  if (!newsList) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};

const deleteWater = async (req, res) => {
  const { id } = req.params;
  if (!id) return ApiResponse.error(res, "News ID Not Found", 400);
  let newsList = await WaterTest.destroy({ where: { id: id } });

  if (newsList == 0) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};

const updateWater = async (req, res) => {
  const { id } = req.params;
  var { body } = req;

  if (!id) return ApiResponse.error(res, "News ID Not Found", 400);
  let newsList = await WaterTest.update(body, {
    where: { id: id },
  });

  if (!newsList) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};

module.exports = {
  createWater,
  getAllWater,
  getWater,
  deleteWater,
  updateWater,
};

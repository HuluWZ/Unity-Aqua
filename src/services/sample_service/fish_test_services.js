const ApiResponse = require("../configs/api_response");
const FishTest = require("../models/fishTest");

const createFish = async (req, res) => {
  const {body} = req;
  let news = await FishTest.create(body);

  if (!news) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, news);
};

const getAllFish = async (req, res) => {
  let newsList = await FishTest.findAll({
    order: [["createdAt", "DESC"]],
  });

  if (!newsList) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};
const getFish = async (req, res) => {
  console.log("1");
  const { id } = req.params;
  let newsList = await FishTest.findOne({ where: { id: id } });

  if (!newsList) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};

const deleteFish = async (req, res) => {
  const { id } = req.params;
  if (!id) return ApiResponse.error(res, "News ID Not Found", 400);
  let newsList = await FishTest.destroy({ where: { id: id } });

  if (newsList == 0) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};

const updateFish = async (req, res) => {
  const { id } = req.params;
  var { body } = req;

  if (!id) return ApiResponse.error(res, "News ID Not Found", 400);
  let newsList = await FishTest.update(body, {
    where: { id: id },
  });

  if (!newsList) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};

module.exports = {
  createFish,
  getAllFish,
  getFish,
  deleteFish,
  updateFish,
};

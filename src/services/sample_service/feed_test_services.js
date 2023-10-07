const ApiResponse = require("../../configs/api_response");
const FeedTest = require("../../models/sample/feedTest");
const Tank = require("../../models/tank");

const createFeed = async (req, res) => {
  const { body } = req;
  let news = await FeedTest.create(body);

  if (!news) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, news);
};

const getAllFeed = async (req, res) => {
  let newsList = await FeedTest.findAll({
    order: [["createdAt", "DESC"]],
    include: Tank,
  });

  if (!newsList) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};
const getFeed = async (req, res) => {
  const { id } = req.params;
  let newsList = await FeedTest.findByPk(id, { include: Tank });

  if (!newsList) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};

const deleteFeed = async (req, res) => {
  const { id } = req.params;
  if (!id) return ApiResponse.error(res, "Feed ID Not Found", 400);
  let newsList = await FeedTest.destroy({ where: { id: id } });

  if (newsList == 0) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};

const updateFeed = async (req, res) => {
  const { id } = req.params;
  var { body } = req;

  if (!id) return ApiResponse.error(res, "Feed ID Not Found", 400);
  let newsList = await FeedTest.update(body, {
    where: { id: id },
  });

  if (!newsList) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};

module.exports = {
  createFeed,
  getAllFeed,
  getFeed,
  deleteFeed,
  updateFeed,
};

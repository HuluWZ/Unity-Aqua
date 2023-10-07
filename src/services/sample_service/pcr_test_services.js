const ApiResponse = require("../../configs/api_response");
const PCRTest = require("../../models/sample/pcrTest");
const Tank = require("../../models/tank");

const createPCR = async (req, res) => {
  const { body } = req;
  let news = await PCRTest.create(body);

  if (!news) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, news);
};

const getAllPCR = async (req, res) => {
  let newsList = await PCRTest.findAll({
    order: [["createdAt", "DESC"]],
    include: Tank,
  });

  if (!newsList) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};
const getPCR = async (req, res) => {
  const { id } = req.params;
  let newsList = await PCRTest.findByPk(id, { include: Tank });

  if (!newsList) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};

const deletePCR = async (req, res) => {
  const { id } = req.params;
  if (!id) return ApiResponse.error(res, "PCR ID Not Found", 400);
  let newsList = await PCRTest.destroy({ where: { id: id } });

  if (newsList == 0) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};

const updatePCR = async (req, res) => {
  const { id } = req.params;
  var { body } = req;

  if (!id) return ApiResponse.error(res, "PCR ID Not Found", 400);
  let newsList = await PCRTest.update(body, {
    where: { id: id },
  });

  if (!newsList) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};

module.exports = {
  createPCR,
  getAllPCR,
  getPCR,
  deletePCR,
  updatePCR,
};

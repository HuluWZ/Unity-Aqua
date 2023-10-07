const ApiResponse = require("../../configs/api_response");
const SoilTest = require("../../models/sample/soilTest");
const Tank = require("../../models/tank");

const createSoil = async (req, res) => {
  const { body } = req;
  let news = await SoilTest.create(body);

  if (!news) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, news);
};

const getAllSoil = async (req, res) => {
  let newsList = await SoilTest.findAll({
    order: [["createdAt", "DESC"]],
    include: Tank,
  });

  if (!newsList) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};
const getSoil = async (req, res) => {
  const { id } = req.params;
  let newsList = await SoilTest.findByPk(id, { include: Tank });

  if (!newsList) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};

const deleteSoil = async (req, res) => {
  const { id } = req.params;
  if (!id) return ApiResponse.error(res, "Soil ID Not Found", 400);
  let newsList = await SoilTest.destroy({ where: { id: id } });

  if (newsList == 0) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};

const updateSoil = async (req, res) => {
  const { id } = req.params;
  var { body } = req;

  if (!id) return ApiResponse.error(res, "Soil ID Not Found", 400);
  let newsList = await SoilTest.update(body, {
    where: { id: id },
  });

  if (!newsList) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};

module.exports = {
  createSoil,
  getAllSoil,
  getSoil,
  deleteSoil,
  updateSoil,
};

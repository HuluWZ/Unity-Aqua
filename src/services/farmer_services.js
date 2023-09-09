const jwt = require("jsonwebtoken");
const Farmer = require("../models/farmer");
const User = require("../models/user");
const ApiResponse = require("../configs/api_response");
const SERECT_KEY = require("../helpers/constants");
const uploadToCloud = require("../configs/cloudnary");

const createFarmer = async (req, res) => {
  //Creating User
  let user = await Farmer.create({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    state: req.body.state,
    district: req.body.district,
    area: req.body.area,
    cultureType: req.body.cultureType,
    userId:req.user.id
  });

  ApiResponse.success(res, {
      farmer: user
    });
  
};

const deleteFarmer = async (req, res) => {
  const { id } = req.params;
  if (!id) return ApiResponse.error(res, "Farmer Id is not Found", 400);

  let user = await Farmer.destroy({
    where: { id: id },
  });
  if (user == 0) return ApiResponse.error(res, "No Farmer with this id", 404);

  return ApiResponse.success(res, user);
};
const findFarmerFromPhone = async (req, res) => {
  const { phone } = req.params;
  if (!phone) return ApiResponse.error(res, "Farmer Phone is not Provided", 400);

  let user = await Farmer.findOne({
    where: { phoneNumber: phone },
  });
  if (!user) return ApiResponse.error(res, "No Farmer with this phone", 404);

  return ApiResponse.success(res, user);
};
const findFarmerAll = async (req, res) => {

  let user = await Farmer.findAll({
    include:User
  });

  return ApiResponse.success(res, user);
};
const findFarmer = async (req, res) => {
  const {id} = req.params;
  let user = await Farmer.findByPk(id);
  if (!user) return ApiResponse.error(res, "No Farmer with This Id", 404);

  return ApiResponse.success(res, user);
};
module.exports = {
  createFarmer,
  deleteFarmer,
  findFarmerAll,
  findFarmer,
  findFarmerFromPhone,
};

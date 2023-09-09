const jwt = require("jsonwebtoken");
const Tank = require("../models/tank");
const Farmer = require("../models/farmer");
const ApiResponse = require("../configs/api_response");
const SERECT_KEY = require("../helpers/constants");
const uploadToCloud = require("../configs/cloudnary");

const createTank = async (req, res) => {
  //Creating User
  const { area, size, cultureType,farmerId } = req.body;
  let user = await Tank.create({
    name: `${cultureType} ${size} ${area}`,
    area,
    size,
    cultureType,
    farmerId
  });

  ApiResponse.success(res, {
    tank: user,
  });
};

const deleteTank = async (req, res) => {
  const { id } = req.params;
  if (!id) return ApiResponse.error(res, "Tank Id is not Found", 400);

  let user = await Tank.destroy({
    where: { id: id },
  });
  if (user == 0) return ApiResponse.error(res, "No Tank with this id", 404);

  return ApiResponse.success(res, user);
};
const findFarmerTankFromPhone = async (req, res) => {
  const { phone } = req.params;
  if (!phone)
    return ApiResponse.error(res, "Farmer Phone is not Provided", 400);

  let farmer = await Farmer.findOne({
    where: { phoneNumber: phone },
  });

  if(!farmer)   return ApiResponse.error(res, "No Farmer with This Phone Found", 400);
  
  let tanks = await Tank.findAll({where:{farmerid : farmer?.id}})  
  
  if (!tanks) return ApiResponse.error(res, "No Tanks with this Farmer", 404);

  return ApiResponse.success(res, {farmer,tanks});
};
const findTankAll = async (req, res) => {
  let user = await Tank.findAll({
    include: Farmer,
  });

  return ApiResponse.success(res, user);
};
const findTank = async (req, res) => {
  const {id} = req.params
  let user = await Tank.findByPk(id);
  if (!user) return ApiResponse.error(res, "No Tank with This Id Found", 400);
  return ApiResponse.success(res, user);
};
module.exports = {
  createTank,
  deleteTank,
  findTankAll,
  findTank,
  findFarmerTankFromPhone,
};

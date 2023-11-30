const jwt = require("jsonwebtoken");
const Tank = require("../models/tank");
const Farmer = require("../models/farmer");
const ApiResponse = require("../configs/api_response");
const SERECT_KEY = require("../helpers/constants");
const uploadToCloud = require("../configs/cloudnary");
const User = require("../models/user");
const {State,District} = require("../models/stateDistrict");
const sequelize = require("sequelize");

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
    include:[User]
  });

  if(!farmer)   return ApiResponse.error(res, "No Farmer with This Phone Found", 400);
  
  let tanks = await Tank.findAll({where:{farmerid : farmer?.id}})  
  
  if (!tanks) return ApiResponse.error(res, "No Tanks with this Farmer", 404);

  return ApiResponse.success(res, {farmer,tanks});
};
const findTankAll = async (req, res) => {
  let user = await Tank.findAll({
    include: [
      {
        model:Farmer,
        include:[User]
      }],
  });

  return ApiResponse.success(res, user);
};
const findTank = async (req, res) => {
  const {id} = req.params
  let user = await Tank.findByPk(id, {
    include: [{ model: Farmer, include: [User] }],
  });
  if (!user) return ApiResponse.error(res, "No Tank with This Id Found", 400);
  console.log(user)
  const obj = {"tank":user}
  return ApiResponse.success(res, obj);
};
const findTankFarmer = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  let userFish = await Tank.findAll({
    where: {
      farmerId: id,
      cultureType: "Fish",
    },
    include: Farmer,
  });
   let userShrimp = await Tank.findAll({
     where: {
       farmerId: id,
       cultureType: "Shrimp",
     },
     include: Farmer,
   });
    let userPoly = await Tank.findAll({
      where: {
        farmerId: id,
        cultureType : "Poly"
      },
      include: Farmer,
    });
  if (!id) return ApiResponse.error(res, "No Tank with This Id Found", 400);
  return ApiResponse.success(res, 
    {fish:userFish,shrimp:userShrimp,poly:userPoly});
};
module.exports = {
  createTank,
  deleteTank,
  findTankAll,
  findTankFarmer,
  findTank,
  findFarmerTankFromPhone,
};

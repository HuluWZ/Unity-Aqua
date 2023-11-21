const jwt = require("jsonwebtoken");
const SECRECT_KEY = require("../helpers/constants");
const ApiResponse = require("../configs/api_response");
const User = require("../models/user");
const LabAssistant = require("../models/labAssistant");

const verifyToken = async (req, res, next) => {
  const { authtoken } = req.headers;
  console.log(req.headers);
  const token = authtoken;
  if (!token) return ApiResponse.error(res, "No User Token", 400);
  try {
    const verifedToken = jwt.verify(token, SECRECT_KEY);
    const uuid = verifedToken.uuid;
    const user = await User.findOne({
      where: { uuid: uuid },
    });
    const labAssistant = await LabAssistant.findOne({
      where: { uuid: uuid },
    });
    if (!(user || labAssistant)) return ApiResponse.error(res, "User not found", 404);
    req.body.user = user?.dataValues || labAssistant?.dataValues;
    req.user = user?.dataValues || labAssistant?.dataValues;
    next();
  } catch (e) {
    console.log(e);
    return ApiResponse.error(res, "Invalid Token", 401);
  }
};

module.exports = verifyToken;

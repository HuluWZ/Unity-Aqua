const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ApiResponse = require("../configs/api_response");
const SERECT_KEY = require("../helpers/constants");
const uploadToCloud = require("../configs/cloudnary");
const { State, District } = require("../models/stateDistrict");

const signUp = async (req, res) => {

  console.log(req.body);
  //Creating User
    const imageUrl1 = req.files?.labLogo[0];
    const imageUrl2 = req.files?.labImage[0];
    const imageUrl3 = req.files?.labReportImage[0];
    var imageUrls = []
    const files = [imageUrl1, imageUrl2, imageUrl3];
    for (const file of files) {
      const { url } = await uploadToCloud(file?.filename);
      imageUrls.push(url);
    }
  // console.log(" Images ",imageUrls);
  let user = await User.create({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    qualification: req.body.qualification,
    pin: req.body.pin,
    stateId: req.body.state,
    districtId: req.body.district,
    area: req.body.area,
    labName: req.body.labName,
    labImage: imageUrls?.length == 0 ? null : imageUrls[1],
    labLogo: imageUrls?.length == 0 ? null : imageUrls[0],
    labReportImage: imageUrls?.length == 0 ? null : imageUrls[2],
    labReport : req.body.labReport
  });

  if (user) {
    const token = jwt.sign({ uuid: user.uuid }, SERECT_KEY);
    ApiResponse.success(res, {
      authToken: token,
      user: user,
    });
  }
};

const login = async (req, res) => {
  console.log(" USERRR ",req.body)
  await User.sync({ alter: true });
  // await ForumBookmark.sync();
  const { isAdmin } = req.query;

  const user = await User.findOne({
    where: {
       phoneNumber: req.body.phoneNumber, 
       pin: req.body.pin
      },
  });
  console.log(user);
  if (!user) return ApiResponse.error(res, "User not found", 200);
  if (user.status =="2") return ApiResponse.error(res, "User is not Approved by Admin", 200);

  if (isAdmin) {
    if (user.get().role !== "admin")
      return ApiResponse.error(res, "User has no privilege", 400);
  }

  const token = jwt.sign({ uuid: user.uuid }, SERECT_KEY,{
           expiresIn: '2d'
  });
  ApiResponse.success(res, {
    authToken: token,
    user: user,
  });
};

const userProfile = async (req, res) => {
  // await User.sync();
  ApiResponse.success(res, req.body.user);
};

const getAllUsers = async (req, res) => {
  let users = await User.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: User, // Include the approver (User) model
        as: "approver", // Use the alias you defined in the User model
        attributes: ["name","phoneNumber"], // Specify the attributes you want to include
      },
    ],
  });
  if (!users) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, users);
};

const changeUserStatus = async (req, res) => {
  const { userId } = req.body;
  if (!userId) return ApiResponse.error(res, "User ID Not Found", 400);

  let user = await User.update(
    {
      status: req.body.status,
    },
    { where: { id: userId } }
  );
  if (!user) return ApiResponse.error(res, "Something Went Wrong", 400);

  return ApiResponse.success(res, user);
};
const changePassword = async (req, res) => {
  const { phoneNumber, pin } = req.body;
  if (!phoneNumber)
    return ApiResponse.error(res, "Phone number is not Found", 400);

  let user = await User.update(
    {
      pin,
    },
    { where: { phoneNumber: phoneNumber } }
  );
  if (!user) return ApiResponse.error(res, "Something Went Wrong", 400);

  return ApiResponse.success(res, user);
};

const approveUser = async (req, res) => {
  const { id } = req.params;
  const usr  = req.body?.user
  const data = {
    status: "1",
    approvedDate: new Date(),
    approvedBy: usr?.id,
  };
  console.log(" User ",usr,data);
  let user = await User.update(
    data,
    { 
      where: { id: id } 
    }
  );
  if (!user) return ApiResponse.error(res, "Something Went Wrong", 400);

  return ApiResponse.success(res, user);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const usr = req.body;
  console.log(" User ", usr, );
  let user = await User.update(usr, {
    where: { id: id },
  });
  if (!user) return ApiResponse.error(res, "Something Went Wrong", 400);

  return ApiResponse.success(res, user);
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return ApiResponse.error(res, "User Id is not Found", 400);

  let user = await User.destroy({
    where:{id:id}
  })
  if (user == 0) return ApiResponse.error(res, "No User with this id", 404);

  return ApiResponse.success(res, user);
};
const findUser = async (req, res) => {
  const {id} = req.params;
  let user = await User.findByPk(id, {
    include: [
      {
        model: User, // Include the approver (User) model
        as: "approver", // Use the alias you defined in the User model
        attributes: ["name", "phoneNumber"], // Specify the attributes you want to include
      },
    ],
  });
  if (!user) return ApiResponse.error(res, "No User with this id", 404);

  return ApiResponse.success(res, user);
};
module.exports = {
  signUp,
  login,
  userProfile,
  getAllUsers,
  changeUserStatus,
  changePassword,
  deleteUser,
  approveUser,
  updateUser,
  findUser,
};

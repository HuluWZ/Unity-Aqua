const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db_config");
const { State, District } = require("./stateDistrict");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    pin: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qualification: {
      type: DataTypes.ENUM,
      values: [
        "BSc",
        "MSc",
        "Diploma",
        "Phd",
        "BA",
        "MA",
        "MBA",
        "High School",
        "No",
      ],
      allowNull: false,
    },
    // state: {
    //   type: DataTypes.STRING,
    //   values: [
    //     "Andhra Pradesh",
    //     "Arunachal Pradesh",
    //     "Assam",
    //     "Bihar",
    //     "Chhattisgarh",
    //     "Goa",
    //     "Gujarat",
    //     "Haryana",
    //     "Himachal Prade",
    //     "Jharkhand",
    //     "Karnataka",
    //     "Kerala",
    //     "Madhya Pradesh",
    //     "Maharashtra",
    //     "Manipur",
    //     "Mizoram",
    //     "Meghalaya",
    //     "Nagaland",
    //     "Odisha",
    //     "Punjab",
    //     "Sikkim",
    //     "Rajasthan",
    //     "Tamil Nadu",
    //     "Telangana",
    //     "Tripura",
    //     "Uttarakhand",
    //     "West Bengal",
    //     "Una",
    //     "Bagalkat",
    //     "North Delhi",
    //     "East Delhi",
    //     "West Delhi",
    //     "South Delhi",
    //     "South West Delhi",
    //     "New Delhi",
    //   ],
    //   allowNull: false,
    // },
    district: {
      type: DataTypes.ENUM,
      values: [
        "Mumbai",
        "Delhi",
        "Kolkata",
        "Chennai",
        "Bengaluru",
        "Hyderabad",
        "Pune",
        "Jaipur",
        "Lucknow",
        "Ahmedabad",
        "Chandigarh",
        "Bhopal",
        "Kanpur",
        "Nagpur",
        "Patna",
        "Kochi",
        "Indore",
        "Thiruvananthapuram",
        "Coimbatore",
        "Guwahati",
        "Varanasi",
        "Visakhapatnam",
        "Agra",
        "Nashik",
        "Amritsar",
      ],
      allowNull: false,
    },
    area: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    labName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    labImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    labLogo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    labReportImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    labReport: {
      type: DataTypes.ENUM,
      values: ["Landscape", "Potrait"],
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["admin", "user"],
      defaultValue: "user",
    },
    status: {
      type: DataTypes.ENUM,
      values: ["1", "2"],
      defaultValue: "2",
    },
  },
  { freezeTableName: true }
);

State.hasMany(User);
User.belongsTo(State);

module.exports = User;

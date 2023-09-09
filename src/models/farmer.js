const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db_config");
const User = require("./user");

const Farmer = sequelize.define(
  "farmer",
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
    state: {
      type: DataTypes.STRING,
      values: [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Prade",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Mizoram",
        "Meghalaya",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Sikkim",
        "Rajasthan",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttarakhand",
        "West Bengal",
        "Una",
        "Bagalkat",
        "North Delhi",
        "East Delhi",
        "West Delhi",
        "South Delhi",
        "South West Delhi",
        "New Delhi",
      ],
      allowNull: false,
    },
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
    cultureType: {
      type: DataTypes.ENUM,
      values: ["Fish", "Shrimp", "Both", "Poly"],
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["1", "2"],
      defaultValue: "1",
    },
  },
  { freezeTableName: true }
);
User.hasMany(Farmer);
Farmer.belongsTo(User);

module.exports = Farmer;

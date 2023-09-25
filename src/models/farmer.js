const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db_config");
const User = require("./user");
const {State,District} = require("./stateDistrict");

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
State.hasMany(Farmer);
District.hasMany(Farmer);

Farmer.belongsTo(User);
Farmer.belongsTo(State);
Farmer.belongsTo(District);

module.exports = Farmer;

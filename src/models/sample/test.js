const { DataTypes } = require("sequelize");
const sequelize = require("../../configs/db_config");
const Tank = require("../tank");

const AllTest = sequelize.define(
  "alltest",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    type:{
      type: DataTypes.ENUM,
      values: ["Water", "Fish","Shrimp","Soil","PCR","Feed","Culture"],
      defaultValue: "Water",
      allowNull: false,
    },
    depth: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    biomass: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    weight: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    planktonTest: {
      type: DataTypes.ENUM,
      values :["Yes","No"],
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["1", "2","3"],
      defaultValue: "1",
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

Tank.hasMany(AllTest);
AllTest.belongsTo(Tank);

module.exports = AllTest;

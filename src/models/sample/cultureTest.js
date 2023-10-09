const { DataTypes } = require("sequelize");
const sequelize = require("../../configs/db_config");
const Tank = require("../tank");

const CultureTest = sequelize.define(
  "cultureTest",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    externalAbnormalColor: {
      type: DataTypes.ENUM,
      values: ["Yes", "No"],
      allowNull: false,
    },
    externalLesionUclers: {
      type: DataTypes.ENUM,
      values: ["Yes", "No"],
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["1", "2"],
      defaultValue: "1",
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

Tank.hasMany(CultureTest);
CultureTest.belongsTo(Tank);

module.exports = CultureTest;
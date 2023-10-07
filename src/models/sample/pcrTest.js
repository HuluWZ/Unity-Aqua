const { DataTypes } = require("sequelize");
const sequelize = require("../../configs/db_config");
const Tank = require("../tank");

const PCRTest = sequelize.define(
  "pcrTest",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    pcr: {
      type: DataTypes.ENUM,
      values: ["Positive","Negative"],
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

Tank.hasMany(PCRTest);
PCRTest.belongsTo(Tank);

module.exports = PCRTest;

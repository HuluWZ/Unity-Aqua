const { DataTypes } = require("sequelize");
const sequelize = require("../../configs/db_config");
const Tank = require("../tank");

const SoilTest = sequelize.define(
  "soilTest",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    soilType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    soilNature: {
      type: DataTypes.ENUM,
      values: ["Heavy","Medium","Light"],
      allowNull: false,
    },
    soilPh: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    organicCarbon: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    availableNitrogen: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    prosperous: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    potash: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    sulphur: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    zinc: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    iron: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    boran: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    limeTest: {
      type: DataTypes.ENUM,
      values:["Light","Medium","Heavy"],
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

Tank.hasMany(SoilTest);
SoilTest.belongsTo(Tank);

module.exports = SoilTest;

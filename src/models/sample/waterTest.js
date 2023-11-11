const { DataTypes } = require("sequelize");
const sequelize = require("../../configs/db_config");
const AllTest = require("./test");
const Tank = require("../tank");

const WaterTest = sequelize.define(
  "waterFishTest",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    ph: {
      type: DataTypes.DECIMAL,
    },
    temprature: {
      type: DataTypes.DECIMAL,
    },
    salinity: {
      type: DataTypes.DECIMAL,
    },
    co3: {
      type: DataTypes.DECIMAL,
    },
    hco3: {
      type: DataTypes.DECIMAL,
    },
    totalAlkanility: {
      type: DataTypes.DECIMAL,
    },
    totalHardness: {
      type: DataTypes.DECIMAL,
    },
    ca: {
      type: DataTypes.DECIMAL,
    },
    mg: {
      type: DataTypes.DECIMAL,
    },
    k: {
      type: DataTypes.DECIMAL,
    },
    fe: {
      type: DataTypes.DECIMAL,
    },
    na: {
      type: DataTypes.DECIMAL,
    },
    cl2: {
      type: DataTypes.DECIMAL,
    },
    tan: {
      type: DataTypes.DECIMAL,
    },
    nh3: {
      type: DataTypes.DECIMAL,
    },
    no2: {
      type: DataTypes.DECIMAL,
    },
    h2s: {
      type: DataTypes.DECIMAL,
    },
    co2: {
      type: DataTypes.DECIMAL,
    },
    dissolvedOxygen: {
      type: DataTypes.DECIMAL,
    },
    electricalConductivity: {
      type: DataTypes.DECIMAL,
    },
    totalDissolvedSolids: {
      type: DataTypes.DECIMAL,
    },
    testId: {
      type: DataTypes.INTEGER,
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

Tank.hasMany(WaterTest);
WaterTest.belongsTo(Tank);

WaterTest.belongsTo(AllTest, { foreignKey: 'testId' });
module.exports = WaterTest;

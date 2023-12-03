const { DataTypes } = require("sequelize");
const sequelize = require("../../configs/db_config");
const Tank = require("../tank");
const AllTest = require("./test");

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
    observationType: {
      type: DataTypes.ENUM,
      values:["Good","Problematic"],
      defaultValue :"Good",
      allowNull: false,
    },
    observation:{
     type: DataTypes.STRING,
     allowNull: true
    },
    suggestion:{
     type: DataTypes.STRING,
     allowNull: true
    },
    testId: {
      type: DataTypes.INTEGER,
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

SoilTest.belongsTo(AllTest, { foreignKey: 'testId' });

module.exports = SoilTest;

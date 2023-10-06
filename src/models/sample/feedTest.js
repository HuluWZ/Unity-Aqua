const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db_config");
const Tank = require("./tank");

const FeedTest = sequelize.define(
  "feedTest",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fat: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    protein: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    moisture: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ash: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fiber: {
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

Tank.hasMany(FeedTest);
FeedTest.belongsTo(Tank);

module.exports = FeedTest;

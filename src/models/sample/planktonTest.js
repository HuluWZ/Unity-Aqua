const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db_config");
const Tank = require("./tank");

const PlanktonTest = sequelize.define(
  "planktonTest",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: ["Useful", "Harmful"],
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    percentage: {
      type: DataTypes.INTEGER,
    },
    percentageStar: {
      type: DataTypes.ENUM,
      values: ["*","**","***"]
    },
    planktonType: {
      type: DataTypes.ENUM,
      values: [
        "Green Algea",
        "Diatoms",
        "Zooplankton",
        "Green Blue Algea",
        "Protozoa",
        "Dinoflagallate",
      ],
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

Tank.hasMany(PlanktonTest);
PlanktonTest.belongsTo(Tank);

module.exports = PlanktonTest;

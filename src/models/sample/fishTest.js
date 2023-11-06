const { DataTypes } = require("sequelize");
const sequelize = require("../../configs/db_config");
const Tank = require("../tank");

const FishTest = sequelize.define(
  "fishTest",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fishDetails: {
      type: DataTypes.ENUM,
      values: ["Rohu", "Pangus", "Katla", "Roopchand", "Others"],
      allowNull: false,
    },
    bodyColour: {
      type: DataTypes.ENUM,
      values: ["Normal", "Discoloured", "Dark"],
      allowNull: false,
    },
    bodyTexture: {
      type: DataTypes.ENUM,
      values: ["Normal", "Bacterial Rash", "Wounded"],
      allowNull: false,
    },
    mucus: {
      type: DataTypes.ENUM,
      values: ["Normal", "Heavy", "Moderate"],
      allowNull: false,
    },
    eyes: {
      type: DataTypes.ENUM,
      values: ["Normal", "Popped Out", "Deep"],
      allowNull: false,
    },
    finsColour: {
      type: DataTypes.ENUM,
      values: ["Normal", "Colour Changed", "Damaged"],
      allowNull: false,
    },
    gills: {
      type: DataTypes.ENUM,
      values: ["Red", "Pale", "Damaged"],
      allowNull: false,
    },
    intestines: {
      type: DataTypes.ENUM,
      values: ["Normal", "Empty", "Fluids"],
      allowNull: false,
    },
    internalBloodLumps: {
      type: DataTypes.ENUM,
      values: ["Mild", "Moderate", "Severe"],
      allowNull: false,
    },
    liver: {
      type: DataTypes.ENUM,
      values: ["Normal", "Fatty", "Damaged"],
      allowNull: false,
    },
    gut: {
      type: DataTypes.ENUM,
      values: ["Normal", "Watery", "Puss"],
      allowNull: false,
    },
    gallBladder: {
      type: DataTypes.ENUM,
      values: ["Normal", "Swell", "Damaged"],
      allowNull: false,
    },
    redDisease: {
      type: DataTypes.ENUM,
      values: ["Mild", "Moderate", "Severe"],
      allowNull: false,
    },
    ulcerativeDropsy: {
      type: DataTypes.ENUM,
      values: ["Mild", "Moderate", "Severe"],
      allowNull: false,
    },
    abdominalDropsy: {
      type: DataTypes.ENUM,
      values: ["Mild", "Moderate", "Severe"],
      allowNull: false,
    },
    bodyColumnaris: {
      type: DataTypes.ENUM,
      values: ["Mild", "Moderate", "Severe"],
      allowNull: false,
    },
    gillColumnaris: {
      type: DataTypes.ENUM,
      values: ["Mild", "Moderate", "Severe"],
      allowNull: false,
    },
    epizooticUlcerativeSyndrome: {
      type: DataTypes.ENUM,
      values: ["Mild", "Moderate", "Severe"],
      allowNull: false,
    },
    dactylogyrus: {
      type: DataTypes.ENUM,
      values: ["Mild", "Moderate", "Severe"],
      allowNull: false,
    },
    gyrodactylus: {
      type: DataTypes.ENUM,
      values: ["Mild", "Moderate", "Severe"],
      allowNull: false,
    },
    trichodina: {
      type: DataTypes.ENUM,
      values: ["Mild", "Moderate", "Severe"],
      allowNull: false,
    },
    myxobolus: {
      type: DataTypes.ENUM,
      values: ["Mild", "Moderate", "Severe"],
      allowNull: false,
    },
    anchorWormORLernaea: {
      type: DataTypes.ENUM,
      values: ["Mild", "Moderate", "Severe"],
      allowNull: false,
    },
    argulus: {
      type: DataTypes.ENUM,
      values: ["Mild", "Moderate", "Severe"],
      allowNull: false,
    },
    finRotORTailrot: {
      type: DataTypes.ENUM,
      values: ["Mild", "Moderate", "Severe"],
      allowNull: false,
    },
    hemorrhagicSepticemia: {
      type: DataTypes.ENUM,
      values: ["Mild", "Moderate", "Severe"],
      allowNull: false,
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

Tank.hasMany(FishTest);
FishTest.belongsTo(Tank);

module.exports = FishTest;

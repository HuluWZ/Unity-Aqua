const { DataTypes } = require("sequelize");
const sequelize = require("../../configs/db_config");
const Tank = require("../tank");
const AllTest = require("./test");

const ShrimpTest = sequelize.define(
  "shrimpTest",
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
    externalExcessiveMucus: {
      type: DataTypes.ENUM,
      values: ["Yes", "No"],
      allowNull: false,
    },
    externalMalformations: {
      type: DataTypes.ENUM,
      values: ["Yes", "No"],
      allowNull: false,
    },
    gillsDiscoloration: {
      type: DataTypes.ENUM,
      values: ["Yes", "No"],
      defaultValue: "1",
    },
    gillsParasites: {
      type: DataTypes.ENUM,
      values: ["Yes", "No"],
      defaultValue: "1",
    },
    hepatopancreasDiscoloration: {
      type: DataTypes.ENUM,
      values: ["Yes", "No"],
      defaultValue: "1",
    },
    hepatopancreasEnlargement: {
      type: DataTypes.ENUM,
      values: ["Yes", "No"],
      allowNull: false,
    },
    stomachForeignMaterial: {
      type: DataTypes.ENUM,
      values: ["Yes", "No"],
      allowNull: false,
    },
    stomachAbnormalities: {
      type: DataTypes.ENUM,
      values: ["Yes", "No"],
      allowNull: false,
    },
    reproductiveAbnormalities: {
      type: DataTypes.ENUM,
      values: ["Yes", "No"],
      allowNull: false,
    },
    intestineBlockages: {
      type: DataTypes.ENUM,
      values: ["Yes", "No"],
      allowNull: false,
    },
    intestineParasites: {
      type: DataTypes.ENUM,
      values: ["Yes", "No"],
      allowNull: false,
    },
    muscleTissueDiscoloration: {
      type: DataTypes.ENUM,
      values: ["Yes", "No"],
      allowNull: false,
    },
    muscleTissueLesions: {
      type: DataTypes.ENUM,
      values: ["Yes", "No"],
      allowNull: false,
    },
    nervousSystemAbnormalities: {
      type: DataTypes.ENUM,
      values: ["Yes", "No"],
      allowNull: false,
    },
    generalBehaviorWeeknessOrLethargy: {
      type: DataTypes.ENUM,
      values: ["Yes", "No"],
      allowNull: false,
    },
    generalBehaviorReducedFeeding: {
      type: DataTypes.ENUM,
      values: ["Yes", "No"],
      allowNull: false,
    },
    specificDiseaseWhiteSpotSyndromeVirus: {
      type: DataTypes.ENUM,
      values: ["Yes", "No"],
      allowNull: false,
    },
    specificDiseaseInfectiousHypodermalVirus: {
      type: DataTypes.ENUM,
      values: ["Yes", "No"],
      allowNull: false,
    },
    specificDiseaseRunningMortalitySydrome: {
      type: DataTypes.ENUM,
      values: ["Yes", "No"],
      allowNull: false,
    },
    specificDiseaseTauraSyndromeVirus: {
      type: DataTypes.ENUM,
      values: ["Yes", "No"],
      allowNull: false,
    },
    specificDiseaseYellowHeadVirus: {
      type: DataTypes.ENUM,
      values: ["Yes", "No"],
      allowNull: false,
    },
    specificDiseaseEarlyMortalitySydrome: {
      type: DataTypes.ENUM,
      values: ["Yes", "No"],
      allowNull: false,
    },
    specificDiseaseVibrioInfections: {
      type: DataTypes.ENUM,
      values: ["Yes", "No"],
      allowNull: false,
    },
    specificDiseaseAeromonasInfections: {
      type: DataTypes.ENUM,
      values: ["Yes", "No"],
      allowNull: false,
    },
    specificDiseaseEHP: {
      type: DataTypes.ENUM,
      values: ["Yes", "No"],
      allowNull: false,
    },
    specificDiseaseFungiAndBacteria: {
      type: DataTypes.ENUM,
      values: ["Yes", "No"],
      allowNull: false,
    },
    diagnosedProblemAndDisease:{
      type: DataTypes.STRING,
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

Tank.hasMany(ShrimpTest);
ShrimpTest.belongsTo(Tank);

ShrimpTest.belongsTo(AllTest, { foreignKey: 'testId' });

module.exports = ShrimpTest;

const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db_config");

const State = sequelize.define(
  "state",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    
  },
  { freezeTableName: true }
);



module.exports = State;

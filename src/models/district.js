const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db_config");
const State = require("./state")

const District = sequelize.define(
  "district",
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
      unique: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true,
      unique:true
    }
  },
  { freezeTableName: true }
);

State.hasMany(District);
District.belongsTo(State);


module.exports = District;

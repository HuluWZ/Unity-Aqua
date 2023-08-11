const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("unityaqua_db", "root", "",
  {
     host: "localhost",
     dialect: "mysql",
     logging: false,
});
// unityaqua_db
// unityaqua_user
// Raghavendraraju@123

module.exports = sequelize;

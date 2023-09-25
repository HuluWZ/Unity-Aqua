const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("unityaqua_db1", "root", "",
  {
     host: "localhost",
    dialect: "mysql",
     logging: false,
    //  port:4306
});
// unityaqua_db
// unityaqua_user
// Raghavendraraju@123

module.exports = sequelize;

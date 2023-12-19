const express = require("express");
const cron = require('node-cron');
const sequelize = require("./src/configs/db_config");
const routes = require("./src/controllers/index");
const handleError = require("./src/middlewares/handle_error");
const { deleteTestsSync } = require('./src/cronJobs');
const fileUpload = require("express-fileupload");
const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use(fileUpload());
// app.use(express.json());
app.use(routes);
app.use(handleError);

const port = process.env.PORT || 3001;

cron.schedule('0 0 * * *', () => {
  deleteTestsSync()
    .then((deletedCount) => {
      console.log(`${deletedCount} Tests deleted successfully on  ${new Date()}`);
    })
    .catch((error) => {
      console.error('Failed to delete tests:', error);
    });
},{
  timezone: 'Asia/Kolkata'
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Db connected");
    // sequelize.dropAllSchemas();
    // sequelize.sync({ alter: true }).then((res) => {
    app.listen(port, () => {
      console.log(`Connected to ${port}`);
    });
    // });
  })
  .catch((err) => {
    console.log(`Error ${err}`);
  });

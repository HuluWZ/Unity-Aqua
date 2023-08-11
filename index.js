const express = require("express");
const app = express();
const sequelize = require("./src/configs/db_config");
const routes = require("./src/controllers/index");
const handleError = require("./src/middlewares/handle_error");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({}))
// app.use(fileUpload());
app.use(express.json());
app.use(routes);
app.use(handleError);

const port = process.env.PORT || 3001;

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

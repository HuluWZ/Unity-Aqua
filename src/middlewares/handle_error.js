const ApiResponse = require("../configs/api_response");
module.exports = function (err, req, res, next) {
  let message;
  console.log(" Err ",err)
  if (err?.errors[0]?.message != null) {
    message = err.errors[0]?.message;
  } else {
    message = err.message;
  }
  ApiResponse.error(res, message, 404);
};

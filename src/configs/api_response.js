const success = (res, result) => {
  let successResponse = {
    message: "OK",
    RESPONSE: "SUCCESS",
    statusCode: 200,
    result,
  };
  return res.status(200).send(successResponse);
};

const error = (res, message, statusCode) => {
  let errorResponse = {
    message,
    RESPONSE: "FAILURE",
    statusCode,
    result: null,
  };
  return res.status(statusCode).send(errorResponse);
};
const validation = (res, message, statusCode) => {
  let validationResponse = {
    message,
    RESPONSE: "FAILURE",
    statusCode,
    result: null,
  };
  return res.status(400).send(validationResponse);
};

module.exports = { success, error, validation };

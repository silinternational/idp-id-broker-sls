const errorNames = {
  400: 'Bad Request'
  422: 'Unprocessable Entity'
  500: 'Internal Server Error'
};

const returnError = (statusCode, error, callback) => {
  const response = {
    statusCode: statusCode,
    body: JSON.stringify({
      "name": errorNames[statusCode],
      "message": error,
      "code": 0,
      "status": statusCode
    })
  };
  callback(null, response);
};
module.exports.returnError = returnError;

const returnServerError = (error, callback) => {
  console.error(error);
  returnError(500, error, callback);
};

module.exports.returnItem = (item, callback) => {
  const response = {
    statusCode: item ? 200 : 204,
    body: JSON.stringify(item)
  };
  callback(null, response);
};
module.exports.returnServerError = returnServerError;

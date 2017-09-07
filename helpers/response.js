module.exports.returnError = (error, callback) => {
  const response = {
    statusCode: 500,
    body: JSON.stringify(error)
  };
  callback(null, response);
};

module.exports.returnItem = (item, callback) => {
  const response = {
    statusCode: item ? 200 : 204,
    body: JSON.stringify(item)
  };
  callback(null, response);
};

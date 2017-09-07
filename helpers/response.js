module.exports = {
  returnItem: function(item, callback) {
    const response = {
      statusCode: item ? 200 : 204,
      body: JSON.stringify(item)
    };
    callback(null, response);
  }
};

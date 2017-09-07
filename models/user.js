'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const response = require('../helpers/response.js');

module.exports.getUser = (employeeId, callback) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      employee_id: employeeId
    }
  };
  
  dynamoDb.get(params, (error, result) => {
    callback(error, result.Item);
  });
};

module.exports.returnUser = (employeeId, callback) => {
  getUser(event.pathParameters.employee_id, (error, user) => {
    if (error) {
      console.error(error);
      response.returnError(error, callback);
    }
    response.returnItem(user, callback);
  });
};

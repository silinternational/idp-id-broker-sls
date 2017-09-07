'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const response = require('../helpers/response.js');

const getUser = (employeeId, callback) => {
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
module.exports.getUser = getUser;

const returnUser = (employeeId, callback) => {
  getUser(employeeId, (error, user) => {
    if (error) {
      console.error(error);
      response.returnError(error, callback);
    }
    response.returnItem(user, callback);
  });
};
module.exports.returnUser = returnUser;

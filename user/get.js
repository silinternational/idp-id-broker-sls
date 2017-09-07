'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const response = require('../helpers/response.js');

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      employee_id: event.pathParameters.employee_id
    }
  };
  
  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error('Could not get user.'));
      return;
    }
    
    response.returnItem(result.Item, callback);
  });
}

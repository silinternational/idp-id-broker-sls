'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.delete = (event, context, callback) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      uuid: event.pathParameters.uuid
    }
  };
  
  dynamoDb.delete(params, (error) => {
    if (error) {
      console.error(error);
      callback(new Error('Could not delete user.'));
      return;
    }
    
    const response = {
      statusCode: 200,
      body: JSON.stringify({})
    };
    callback(null, response);
  });
};

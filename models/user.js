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

const createAndReturnUser = (requestBody, callback) => {
  const timestamp = new Date().getTime();
  if (typeof requestBody === 'undefined') {
    response.returnError(422, 'No request body found', callback);
    return;
  }
  const data = JSON.parse(requestBody);
  
  if (data === null) {
    response.returnError(422, 'Request body did not contain JSON', callback);
    return;
  }
  if (typeof data.employee_id !== 'string') {
    response.returnError(422, 'Employee ID must be a string', callback);
    return;
  }
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      uuid: uuid.v1(),
      employee_id: data.employee_id,
      first_name: data.first_name,
      last_name: data.last_name,
      display_name: data.display_name,
      username: data.username,
      email: data.email,
      active: data.active,
      locked: data.locked,
      last_changed_utc: timestamp,
      last_synced_utc: undefined,
    }
  }
  dynamoDb.put(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error('Could not create the user.'));
      return;
    }
    
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    }
    callback(null, response);
  });
};
module.exports.createAndReturnUser = createAndReturnUser;

const returnUser = (employeeId, callback) => {
  getUser(employeeId, (error, user) => {
    if (error) {
      console.error(error);
      response.returnServerError(error, callback);
    }
    response.returnItem(user, callback);
  });
};
module.exports.returnUser = returnUser;

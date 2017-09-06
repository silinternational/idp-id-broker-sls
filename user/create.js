'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  if (typeof event.body === 'undefined') {
    console.error('No request body found.');
    callback(new Error('Could not create the user.'));
    return;
  }
  const data = JSON.parse(event.body);
  
  if (data === null) {
    console.error('No JSON data found.');
    callback(new Error('Could not create the user.'));
    return;
  }
  if (typeof data.employee_id !== 'string') {
    console.error('Validation failed: employee_id is not a string.');
    callback(new Error('Could not create the user.'));
    return;
  }
  const params = {
    TableName: 'idp-id-broker.user',
    Item: {
      id: uuid.v1(),
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
  })
}

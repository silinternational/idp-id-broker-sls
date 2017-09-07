'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const createAndReturnUser = require('../models/user.js').createAndReturnUser;

module.exports.create = (event, context, callback) => {
  createAndReturnUser(event.body, callback);
};

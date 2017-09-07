'use strict';

const returnUser = require('../models/user.js').returnUser;

module.exports.get = (event, context, callback) => {
  returnUser(event.pathParameters.employee_id, callback);
};

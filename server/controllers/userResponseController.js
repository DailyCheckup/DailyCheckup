'use strict';
const UserResponse = require('./../UserResponse/UserResponseModel');

const UserResponseController = {};

UserResponseController.addResults = function (req, res, next) {
  if (Object.keys(req.body).length === 0) {
    throw new Error('Nothing to push into the results table!');
  }
  // expecting req.body to be an object with a key-value pair of data: to an
  // array of objects with the correct model requirements for a userResponse row
  console.log('this is the req body-----------------------------------' + req.body.data[0].respondedCorrectly);
  UserResponse.bulkCreate(req.body.data).then((result) => {
    console.log(result);
    if (!result) {
      throw new Error('The creation was unsuccessful!');
    } else {
      next();
    }
  });
};

module.exports = UserResponseController;

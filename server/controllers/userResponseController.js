'use strict';
const UserResponse = require('./../UserResponse/UserResponseModel');
const GroupData = require('./../Questions/groupDataModel.js');
const moment = require('moment');
const UserResponseController = {};

UserResponseController.addResults = function (req, res, next) {
  if (Object.keys(req.body).length === 0) {
    throw new Error('Nothing to push into the results table!');
  }
  console.log(req.body.data, 'this is body data from submitting a quiz');
  // expecting req.body to be an object with a key-value pair of data: to an
  // array of objects with the correct model requirements for a userResponse row
  console.log('this is the req body----------------------------------- ' + req.body.data[0].respondedCorrectly);
  UserResponse.bulkCreate(req.body.data).then((result) => {
    if (!result) {
      throw new Error('The creation was unsuccessful!');
    } else {
      next();
    }
  });
};

UserResponseController.postToGroupDataTable = (req, res, next) => {
  // todays date in YYYY-MM-DD format
  const dateTimeZoneAdjusted = moment(Date.now()).utcOffset(-5);
  const formattedDate = moment(dateTimeZoneAdjusted).format('YYYY-MM-DD');
  const resultData = req.body.data;
  function updateRow(i, letter) {
    GroupData.findOne({ where: { questionid: resultData[i].questionid, date: formattedDate } })
     .then((instance) => {
       if (resultData[i].respondedCorrectly) {
         instance.increment([`${letter}_count`, 'num_of_people_total', 'num_of_people_correct'],
         { by: 1 }); // increment total people, correct and letter count by 1
       } else {
         instance.increment([`${letter}_count`, 'num_of_people_total', 'num_of_people_incorrect'],
         { by: 1 }); // increment total people, incorrect and letter count by 1
       }
     });
  }
  for (let i = 0; i < resultData.length; i++) {
    let letter = resultData[i].submittedAnswer.toLowerCase();
    if (req.body.data[0].email.indexOf('@aspirus.org') === -1) next();
    else updateRow(i, letter);
  }
  next();
};

module.exports = UserResponseController;

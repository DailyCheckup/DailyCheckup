'use strict';
const UserResponses = require('./../UserResponse/UserResponseModel.js');
const Questions = require('./../Questions/QuestionsModel.js');

const gatherResults = {
  getAllData(req, res, next) {
    // Gather all response data for all users
    UserResponses.findAll({ 
      where: { 
        questionid: { 
          gt: 0
        }
      }
    }).then((allResponses) => {
      const allResponseData = allResponses.map(function (result) {
        return result.dataValues;
      });
      console.log('parsed data ', allResponseData);
      next();
    });
  },

  isUserAdmin(req, res, next) {
    if (req.body.isAdmin) {
      gatherResults.getAllData(req, res, next);
    } else {
      gatherResults.getUserData(req, res, next);
    }
  },

  getUserData(req, res, next) {
    UserResponses.findAll({
      where: {
        email: req.body.email
      }
    }).then((user) => {
      const userResponseData = user.map(function (result) {
        return result.dataValues;
      });
      console.log('USER RESPONSES>>>> ', userResponseData);
      next();
    });
  },

  gatherQuestions(req, res, next) {
    Questions.findAll({
      where: {
        chosen: true
      }
    }).then((allChosenQuestions) => {
      const chosenQuestions = allChosenQuestions.map(function (question) {
        return question.dataValues;
      });
      console.log('ALL CHOSEN QUESTIONS >>>> ', chosenQuestions);
      next();
    });
  },
  
};

module.exports = gatherResults;

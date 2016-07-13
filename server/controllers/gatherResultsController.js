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
      //console.log('parsed data ', allResponseData);
      req.dataResults = {};
      req.dataResults.allResponseData = allResponseData;
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
      req.dataResults = {};
      req.dataResults.userResponseData = userResponseData;
      next();
    });
  },

  gatherQuestions(req, res, next) {
    Questions.findAll({
      where: {
        questionid: {
          gt: 0,
        }
      }
    }).then((allChosenQuestions) => {
      var count = 0;
      // Array of objects of all questions because if we relied on chosen:true, after questions
      // are reset, we wouldn't grab the prior questions
      const allQuestions = allChosenQuestions.map(function (question) {
        ++count;
        return question.dataValues;
      });

      // Object of key value pairs is date: array of daily questions
      const studentQuestionsTaken = req.dataResults.questionResultsPerDay;

      // Create an array of only the daily question ids
      const questionsTakenIds = [];

      // Go through each date and question and grab all the question ids
      for (var date in studentQuestionsTaken) {
        studentQuestionsTaken[date].forEach(function (question) {
          questionsTakenIds.push(question.questionid);
        });
      }

      // Filter out questions to only include what's been released
      const filteredChosenQuestions = allQuestions.filter(function (question) {
        return questionsTakenIds.indexOf(question.questionid) > -1;
      });

      // Chosen questions is an array of question objects for all released questions
      req.dataResults.chosenQuestions = filteredChosenQuestions;
      console.log('filtered question count ', filteredChosenQuestions.length);
      console.log('filtered questions ', filteredChosenQuestions);
      next();
    });
  },
  
  addQuestionInfoToResults(req, res, next) {
    let groupResults = req.dataResults.questionResultsPerDay;
    let questionInfo = req.dataResults.chosenQuestions;

    for (var date in groupResults) {
      groupResults[date].forEach(function (result) {
        const index = gatherResults.objectLocation(questionInfo, result.questionid);
        result.question = questionInfo[index].question;
        result.answer = questionInfo[index].answer;
        result.reason = questionInfo[index].reason;
        result.genre = questionInfo[index].genre;
        result.a_option = questionInfo[index].a;
        result.b_option = questionInfo[index].b;
        result.c_option = questionInfo[index].c;
        result.d_option = questionInfo[index].d;
        result.e_option = questionInfo[index].e;
      });
    }
    console.log('complete rows ', groupResults);
    req.dataResults.groupResults = groupResults;
    next();
  },

  objectLocation(array, idNum) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].questionid === idNum) {
        return i;
      }
    }
    return undefined;
  },

};

module.exports = gatherResults;

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
      if (allResponses === null) {
        throw new Error('Could not gather user responses');
      }
      const allResponseData = allResponses.map(function (result) {
        return result.dataValues;
      });
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
      if (user === null) {
        throw new Error ('Could not find user');
      }
      const userResponseData = user.map(function (result) {
        return result.dataValues;
      });
      //console.log('USER RESPONSES>>>> ', userResponseData);
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
      if (allChosenQuestions === null) {
        throw new Error('Could not find questions');
      }
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
      //console.log('filtered question count ', filteredChosenQuestions.length);
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

    // Array of objects (not ab object with date properties) to make rows in the table
    let groupResultsForRows = [];
    for (var date in groupResults) {
      groupResults[date].forEach(function (result) {
        groupResultsForRows.push(result);
      });
    }
    console.log('complete rows ', groupResultsForRows);
    req.dataResults.groupResults = groupResultsForRows;
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

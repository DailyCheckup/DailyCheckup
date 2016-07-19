'use strict';
const UserResponse = require('./../UserResponse/UserResponseModel');
const DailyQuestions = require('./../Questions/dailyQuestionsModel');
const moment = require('moment');
const todaysDate = moment(Date.now()).utcOffset(-5).format('YYYY-MM-DD');
const tomorrowsDate = moment(Date.now()).utcOffset(-5).add(1, 'd').format('YYYY-MM-DD');
// const todaysDate = '2016-07-11';
// const tomorrowsDate = '2016-07-12';
// Dates are set for a 12 hour window, if time is updated need to update the below variables
const todayBeginning = `${todaysDate} 05:00:00.00`;
const todayEnd = `${tomorrowsDate} 05:00:00.00`;
// 5pm 15th
// 5am 16th

module.exports = {

  checkQuizWasTaken(req, res, next) {
    const dailyQuestions = req.results.dailyQuestions;
    const userEmail = req.results.email;
    const dailyQuestionIds = dailyQuestions.map(function (question) {
      return question.questionid;
    });
    UserResponse.findAll({
      where: { email: userEmail, questionid: dailyQuestionIds[0] }
    }).then(function (results) {
      if(userEmail === 'demo') {
        req.results.takenQuiz = false;
      } else if (!results.length) {
        req.results.takenQuiz = false;
      } else {
        req.results.takenQuiz = true;
      }
      next();
    });
  },

  checkQuizAvailability( req, res, next) {
    DailyQuestions.findAll({ where: { available: true } }).then(function(result) {
      if (req.body.emailAddress === 'demo') {
        req.results.quizAvailability = true;
      } else if (!result.length) {
        req.results.quizAvailability = false;
      } else {
        req.results.quizAvailability = true;
      }
      next();
    });
  },

  allWhoHaveTakenQuiz(req, res, next) {
    UserResponse.findAll({
      attributes: ['email', 'respondedCorrectly'],
      where: {
        createdAt: {
          $between: [todayBeginning, todayEnd]
        }
      },
     }).then((residents) => {
      // Gather residents who have taken the quiz today
      let results = residents.map(function (resident) {
        return resident.dataValues;
      });
      console.log('results ', results);
      // Associate residents and their number responded correctly
      let residentResponses = {};
      results.forEach(function(result) {
        // If resident is already in the object, increment its value if responded correctly is true
        if (residentResponses[result.email]) {
          residentResponses[result.email] += result.respondedCorrectly ? 1 : 0;
        } else {
          residentResponses[result.email] = result.respondedCorrectly ? 1 : 0;
        }
      });
      console.log('found emails at todays date ', residentResponses);
      req.results.takenQuizEmailObj = residentResponses;
      next();
     });
  },

};

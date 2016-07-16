'use strict';
const UserResponse = require('./../UserResponse/UserResponseModel');
const DailyQuestions = require('./../Questions/dailyQuestionsModel');
const moment = require('moment');
const todaysDate = moment(Date.now()).format('MM-DD-YYYY');
const todayBeginning = `${todaysDate} 17:00:00.00`;
const todayEnd = `${todaysDate + 1} 05:00:00.00`;
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
      attributes: ['email'],
      where: {
        createdAt: {
          $between: [todayBeginning, todayEnd]
        }
      },
     }).then((emails) => {
      let results = emails.map(function (email) {
        return email.dataValues;
      });
      let uniqueEmails = [];
      results.forEach(function (result) {
        if (uniqueEmails.indexOf(result.email) === -1) {
          uniqueEmails.push(result.email);
        }
      });
      console.log('found emails at todays date ', uniqueEmails);
      req.results.takenQuizEmailArray = uniqueEmails;
      next();
     });
  },

};

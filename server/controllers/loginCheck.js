'use strict';
const Users = require('./../Users/UserModel.js');
const dailyQuestionsModel = require('./../Questions/dailyQuestionsModel.js');
const Questions = require('./../Questions/QuestionsModel.js');

const loginCheck = {
  validUser(req, res, next) {
    Users.findOne({ where:
      { email: req.body.emailAddress, password: req.body.password },
    })
      .then((user) => {
        req.results = {};
        if (user !== null) {
          req.results.email = req.body.emailAddress;
          next();
        } else {
          throw new Error('Invalid User');
        }
      });
  },
  isAdmin(req, res, next) {
    Users.findOne({ where:
      { email: req.body.emailAddress, password: req.body.password },
    })
    .then((user) => {
      req.results.isAdmin = user.dataValues.adminFlag;
      next();
    });
  },
  firstLogin(req, res, next) {
    Users.findOne({ where:
      { email: req.body.emailAddress,
        password: req.body.password },
    })
    .then((user) => {
      req.results.changedPassword = user.dataValues.changedPassword;
      next();
    });
  },
  getQuestions(req, res, next) {
    dailyQuestionsModel.findAll({ where:
      { check: true } }).then((questionIDs) => {
        const questionNums = [];
        questionNums.push(
          questionIDs[0].dataValues.question1,
          questionIDs[0].dataValues.question2,
          questionIDs[0].dataValues.question3
        );

        Questions.findAll({ where: { questionid: questionNums } })
        .then((questions) => {
          const dailyQuestions = [];
          for (let i = 0; i < questions.length; i++) {
            dailyQuestions.push(questions[i].dataValues);
          }
          req.results.dailyQuestions = dailyQuestions;
          next();
        });
      });
  },
};
module.exports = loginCheck;

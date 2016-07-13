'use strict';
const Users = require('./../Users/UserModel.js');
const dailyQuestionsModel = require('./../Questions/dailyQuestionsModel.js');
const Questions = require('./../Questions/QuestionsModel.js');
const bcrypt = require('bcrypt');

const loginCheck = {
  validUser(req, res, next) {
    Users.findOne({ where:
      { email: req.body.emailAddress },
    })
      .then((user) => {
        req.results = {};
        if (user !== null && user.dataValues.changedPassword === false) {
          if (req.body.password === user.dataValues.password) {
            req.results.email = req.body.emailAddress;
            return next();
          } else {
            res.sendStatus(400);
            throw new Error('Invalid User');
          }
        }
        if (user !== null && bcrypt.compareSync(req.body.password, user.dataValues.password)) {
          req.results.email = req.body.emailAddress;
          req.results.isAdmin = user.dataValues.adminFlag;
          req.results.changedPassword = user.dataValues.changedPassword;
          req.results.firstName = user.dataValues.firstname;
          next();
        } else {
          res.sendStatus(400);
          throw new Error('Invalid User');
        }
      });
  },

  isAdmin(req, res, next) {
    Users.findOne({ where:
      { email: req.body.emailAddress },
    })
    .then((user) => {
      req.results.isAdmin = user.dataValues.adminFlag;
      next();
    });
  },

  firstLogin(req, res, next) {
    Users.findOne({ where:
      { email: req.body.emailAddress },
    })
    .then((user) => {
      req.results.changedPassword = user.dataValues.changedPassword;
      req.results.firstName = user.dataValues.firstname;
      next();
    });
  },

  getQuestions(req, res, next) {
    dailyQuestionsModel.findAll({ where:
      { check: true } }).then((questionIDs) => {
        const questionNums = [];
        var num_of_questions = Object.keys(questionIDs[0].dataValues).length - 5;
        for (let i = 0; i < num_of_questions; i++) {
          var question = `question${i + 1}`;
          questionNums.push(questionIDs[0].dataValues[question])
        }
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

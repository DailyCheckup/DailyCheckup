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
        if (user.dataValues.changedPassword === false) {
          if (req.body.password === user.dataValues.password) {
            req.results.email = req.body.emailAddress;
            return next();
          } else {
            throw new Error('Invalid User2');
          }
        }
        if (user !== null && bcrypt.compareSync(req.body.password, user.dataValues.password)) {
          req.results.email = req.body.emailAddress;
          next();
        } else {
          res.sendStatus(400)
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
        // for (let i = 0; i < questionIDs[0].dataValues.length)

        var num_of_questions = Object.keys(questionIDs[0].dataValues).length - 5;
        for (let i = 0; i < num_of_questions; i++) {
          var question = `question${i + 1}`;
          questionNums.push(questionIDs[0].dataValues[question])
        }
        // questionNums.push(
        //   questionIDs[0].dataValues.question1,
        //   questionIDs[0].dataValues.question2,
        //   questionIDs[0].dataValues.question3
        // );
        console.log(questionNums, 'this should be an array of 3 numbers');
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

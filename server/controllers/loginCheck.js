'use strict';
const Questions = require('./../Questions/QuestionsModel.js');
const Users = require('./../Users/UserModel.js');

const loginCheck = {
  validUser(req, res, next) {
    Users.findOne({ where:
      { email: req.body.email, password: req.body.password },
    })
      .then((user) => {
        req.results = {};
        if (user !== null) {
          req.results.email = req.body.email;
          next();
        } else {
          throw new Error('Invalid User');
        }
      });
  },
  isAdmin(req, res, next) {
    Users.findOne({ where:
      { email: req.body.email, password: req.body.password },
    })
    .then((user) => {
      req.results.isAdmin = user.dataValues.adminFlag;
      next();
    });
  },
  firstLogin(req, res, next) {
    Users.findOne({ where:
      { email: req.body.email,
        password: req.body.password },
    })
    .then((user) => {
      req.results = {};
      req.results.changedPassword = user.dataValues.changedPassword;
      next();
    });
  },
  getQuestions(req, res, next) {
    Questions.findAll({ where:
      { chosen: false } }).then((questions) => {
        const nonChosenQuestionCount = questions.length;
        const array = [];
        let randomQ;
        for (let i = 0; i < 3; i++) {
          randomQ = Math.floor(Math.random() * nonChosenQuestionCount);
          array.push(questions[randomQ].dataValues.questionid);
          Questions.update(
            { chosen: true },
            { where: { questionid: questions[randomQ].dataValues.questionid } }
          );
        }
        req.results.dailyQuestions = array;
        next();
      });
  },
};

module.exports = loginCheck;

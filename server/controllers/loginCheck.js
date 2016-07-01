'use strict';
const Sequelize = require('sequelize');
const DB = new Sequelize('postgres://BBSCorp:lakers24~@mymdquizdb.cwyegj8iv25h.us-west-1.rds.amazonaws.com/MD_Quiz_DB');

const Tests = DB.define('test', {
  email: Sequelize.TEXT,
  password: Sequelize.TEXT,
  adminFlag: Sequelize.BOOLEAN,
});
const loginCheck = {
  validUser(req, res, next) {
    Tests.findOne({ where:
      { email: req.body.email, password: req.body.password },
    })
      .then((user) => {
      // project will be the first entry of the Projects table with the title 'aProject' || null
        if (user !== null) {
          next();
        } else {
          throw new Error('Invalid User');
        }
      });
  },
  isAdmin(req, res, next) {
    Tests.findOne({ where:
      { email: req.body.email, password: req.body.password },
    })
    .then((user) => {
        req.results = {};
        req.results.isAdmin = user.dataValues.adminFlag;
        next();
    });
  },
  firstLogin(req, res, next) {
    Tests.findOne({ where:
      { email: req.body.email, password: req.body.password },
    })
    .then((user) => {
        req.results = {};
        req.results.firstLogin = user.dataValues.changedPassword;
        next();
    });
  },
  getQuestions(req, res, next) {
    console.log('get questions');
    next();
  },
};

module.exports = loginCheck;

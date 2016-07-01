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
          req.results = {};
          req.results.validUser = true;
          next();
        } else {
          req.results.validUser = false;
          throw new Error('Invalid User');
        }
      });
  },
  isAdmin(req, res, next) {
    console.log('in is admin function');
    Tests.findOne({ where:
      { email: req.body.email, password: req.body.password, adminFlag: req.body.adminFlag },
    })
      .then((user) => {
        if (user !== null) {
          console.log(req.results,'this is results in admin');
          req.results.isAdmin = true;
        } else {
          req.results.isAdmin = false;
        }
        next();
      });

  },
  firstLogin(req, res, next) {
    console.log('first login');
    console.log(req.results);
    next();
  },
  getQuestions(req, res, next) {
    console.log('get questions');
    next();
  },
};

module.exports = loginCheck;

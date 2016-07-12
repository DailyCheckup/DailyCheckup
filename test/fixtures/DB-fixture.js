'use strict'
const Sequelize = require('sequelize');
let privateKey = require('./../../testingKeys.js').dbKey;
const DB = new Sequelize(privateKey);

  const UserTests = DB.define('usertest', {
    email: Sequelize.TEXT,
    password: Sequelize.TEXT,
    changePassword: Sequelize.BOOLEAN,
  });

UserTests.sync();

  // UserTests.build({ email: 'Brendan', password: 'hihi', changedPassword: false }).save();


module.exports = UserTests;

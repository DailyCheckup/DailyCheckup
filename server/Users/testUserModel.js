const DB = require('../DB/Database.js');
const Sequelize = require('sequelize');

const UserTests = DB.define('usertest', {
  email: Sequelize.TEXT,
  password: Sequelize.TEXT,
});

UserTests.sync();

//UserTests.build({email: 'sandra@hi.com', password: 'hihi'}).save();

module.exports = UserTests;

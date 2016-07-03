const Sequelize = require('sequelize');
const DB = require('../DB/Database.js');

const dailyQuestions = DB.define('dailyquestions', {
  question1: Sequelize.INTEGER,
  question2: Sequelize.INTEGER,
  question3: Sequelize.INTEGER,
  check: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = dailyQuestions;

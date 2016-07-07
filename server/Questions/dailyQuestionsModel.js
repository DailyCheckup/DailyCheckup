const Sequelize = require('sequelize');
const DB = require('../DB/Database.js');

const dailyQuestions = DB.define('dailyquestions', {
  question1: Sequelize.INTEGER,
  question2: Sequelize.INTEGER,
  question3: Sequelize.INTEGER,
  question4: Sequelize.INTEGER,
  question5: Sequelize.INTEGER,
  check: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  available: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});
module.exports = dailyQuestions;

const DB = require('../DB/Database.js');
const Sequelize = require('sequelize');

const UserResponses = DB.define('userResponse', {
  email: Sequelize.TEXT,
  questionid: Sequelize.INTEGER,
  respondedCorrectly: Sequelize.BOOLEAN,
  submittedAnswer: Sequelize.STRING,
  dateCompleted: Sequelize.DATE,
});

module.exports = UserResponses;

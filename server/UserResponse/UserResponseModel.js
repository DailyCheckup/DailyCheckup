const DB = require('../DB/Database.js');
const Sequelize = require('sequelize');

const UserResponses = DB.define('userresponse', {
  email: Sequelize.TEXT,
  questionid: Sequelize.INTEGER,
  respondedCorrectly: Sequelize.BOOLEAN,
  submittedAnswer: Sequelize.STRING,
});

// UserResponses.sync({force:true});

module.exports = UserResponses;

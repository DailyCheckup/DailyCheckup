const Sequelize = require('sequelize');
const DB = require('../DB/Database.js');

const Questions = DB.define('question', {
  questionid: Sequelize.INTEGER,
  question: Sequelize.TEXT,
  a: Sequelize.STRING,
  b: Sequelize.STRING,
  c: Sequelize.STRING,
  d: Sequelize.STRING,
  e: Sequelize.STRING,
  answer: Sequelize.STRING,
  reason: Sequelize.TEXT,
  chosen: Sequelize.BOOLEAN,
  genre: Sequelize.STRING,
});

Questions.sync({ force: true });

module.exports = Questions;

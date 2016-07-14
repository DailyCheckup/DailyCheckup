const Sequelize = require('sequelize');
const DB = require('../DB/Database.js');

const groupData = DB.define('groupdata', {
  questionid: Sequelize.INTEGER,
  date: Sequelize.DATEONLY,
  question: Sequelize.TEXT,
  answer: Sequelize.TEXT,
  reason: Sequelize.TEXT,
  num_of_people_correct: Sequelize.INTEGER,
  num_of_people_incorrect: Sequelize.INTEGER,
  genre: Sequelize.TEXT,
  a_count: Sequelize.INTEGER,
  b_count: Sequelize.INTEGER,
  c_count: Sequelize.INTEGER,
  d_count: Sequelize.INTEGER,
  e_count: Sequelize.INTEGER,
  a_option: Sequelize.TEXT,
  b_option: Sequelize.TEXT,
  c_option: Sequelize.TEXT,
  d_option: Sequelize.TEXT,
  e_option: Sequelize.TEXT,
});

module.exports = groupData;

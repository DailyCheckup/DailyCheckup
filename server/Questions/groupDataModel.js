const Sequelize = require('sequelize');
const DB = require('../DB/Database.js');

const groupData = DB.define('groupdata', {
  questionid: Sequelize.INTEGER,
  date: Sequelize.DATEONLY,
  question: Sequelize.TEXT,
  answer: Sequelize.TEXT,
  reason: Sequelize.TEXT,
  num_of_people_correct: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  num_of_people_incorrect: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  num_of_people_total: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  genre: Sequelize.TEXT,
  a_count: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  b_count: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  c_count: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  d_count: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  e_count: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  a_option: Sequelize.TEXT,
  b_option: Sequelize.TEXT,
  c_option: Sequelize.TEXT,
  d_option: Sequelize.TEXT,
  e_option: Sequelize.TEXT,
});
// groupData.sync({force:true});
module.exports = groupData;

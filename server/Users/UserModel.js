const DB = require('../DB/Database.js');
const Sequelize = require('sequelize');

const Users = DB.define('user', {
  userid: Sequelize.INTEGER,
  firstname: Sequelize.TEXT,
  lastname: Sequelize.TEXT,
  email: Sequelize.TEXT,
  password: Sequelize.TEXT,
  groupid: Sequelize.INTEGER,
  adminFlag: Sequelize.BOOLEAN,
});

Users.sync({ force: true });

module.exports = Users;

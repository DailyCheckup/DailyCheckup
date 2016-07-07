const DB = require('../DB/Database.js');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const SALT_FACTOR = 10;

const Users = DB.define('user', {
  userid: Sequelize.INTEGER,
  firstname: Sequelize.TEXT,
  lastname: Sequelize.TEXT,
  email: {
    type: Sequelize.TEXT,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    set: function (pw) {
      const salt = bcrypt.genSaltSync(SALT_FACTOR);
      const hash = bcrypt.hashSync(pw, salt);
      this.setDataValue('password', hash);
    }
  },
  groupid: Sequelize.INTEGER,
  adminFlag: Sequelize.BOOLEAN,
  changedPassword: { type: Sequelize.BOOLEAN, defaultValue: false },
});

module.exports = Users;

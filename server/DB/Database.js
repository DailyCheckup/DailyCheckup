const Sequelize = require('sequelize');
const privateKey = require('./../../privateKeys.js').dbKey;
const DB = new Sequelize(privateKey);
DB.authenticate()
  .then(function (err) {
    console.log('Connection to DB has been established');
  })
  .catch(function (err) {
    console.log('Unable to connect to DB ', err);
  });

module.exports = DB;

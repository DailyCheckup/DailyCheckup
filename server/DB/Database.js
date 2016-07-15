'use strict'
const Sequelize = require('sequelize');
let privateKey = process.env.PROD_DB_ENV;
if (TRAVIS_SECURE_ENV_VARS) {
  console.log('WE HAVE SECURE VARS AVAILABLE');
}
console.log(process.env, 'THIS IS PROCESS ENV');
if (privateKey === undefined) {
  privateKey = require('./../../privateKeys.js').dbKey;
}
const DB = new Sequelize(privateKey);
DB.authenticate()
  .then(function (err) {
    console.log('Connection to DB has been established');
  })
  .catch(function (err) {
    console.log('Unable to connect to DB ', err);
  });

module.exports = DB;

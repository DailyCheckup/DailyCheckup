'use strict'
const Sequelize = require('sequelize');
let privateKey = process.env.PROD_DB_ENV;
if (process.env.TRAVIS_SECURE_ENV_VARS) {
  console.log(process.env, 'this is process env');
}
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

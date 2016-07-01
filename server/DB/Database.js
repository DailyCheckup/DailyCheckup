const Sequelize = require('sequelize');

const DB = new Sequelize('postgres://BBSCorp:lakers24~@mymdquizdb.cwyegj8iv25h.us-west-1.rds.amazonaws.com/MD_Quiz_DB');
DB.authenticate()
  .then(function (err) {
    console.log('Connection to DB has been established');
  })
  .catch(function (err) {
    console.log('Unable to connect to DB ', err);
  });

module.exports = DB;

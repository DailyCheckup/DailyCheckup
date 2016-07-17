'use strict'
const Sequelize = require('sequelize');
let privateKey;
//travis will have this secure var
if (process.env.TEST_DB_URI) {
  privateKey = process.env.TEST_DB_URI;
} else {
  // this is is avaiable during dev
  privateKey = require('./../../testingKeys.js').dbKey;
}
const DB = new Sequelize(privateKey);

  const UserTests = DB.define('usertest', {
    uuid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    email: Sequelize.TEXT,
    password: Sequelize.TEXT,
    changePassword: Sequelize.BOOLEAN,
  });

// UserTests.sync({force: true});

  // UserTests.build({ uuid: 69, email: 'Brendan', password: 'hello', changePassword: false }).save();

  var objectToExport = {
    DB: DB,
    UserTests: UserTests
  };
module.exports = objectToExport;

const Users = require('./../Users/UserModel.js');
const TestUser = require('./../../test/fixtures/DB-fixture.js').UserTests;
const changePassword = {

  changePasswordInDB(req, res, next) {
    const userEmail = req.body.emailAddress;
    const newPassword = req.body.newPassword;
    if (req.body.emailAddress === 'Brendan') {
      TestUser.update(
        { password: newPassword, changedPassword: true },
        { where: { email: userEmail } }
      ).then((result) => {
        if (!result) {
          throw new Error('Did not update password in the database');
        } else {
          console.log('successfully updated password');
          next();
        }
      });
    } else {
      Users.update(
        { password: newPassword, changedPassword: true },
        { where: { email: userEmail } }
      ).then((result) => {
        if (!result) {
          throw new Error('Did not update password in the database');
        } else {
          console.log('successfully updated password');
          next();
        }
      });
    }
  },
};

module.exports = changePassword;

const Users = require('./../Users/UserModel.js');

const changePassword = {

  changePasswordInDB(req, res, next) {
    const userEmail = req.body.emailAddress;
    const newPassword = req.body.newPassword;
    Users.update(
      { password: newPassword },
      { where: { email: userEmail } }
    ).then((result) => {
      if (!result) {
        throw new Error('Did not update password in the database');
      } else {
        console.log('successfully updated password');
        next();
      }
    });
  },
};

module.exports = changePassword;

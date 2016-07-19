const jwt = require('jsonwebtoken');
const SECRET = require('./../../privateKeys.js').jwtSecret;


const jwtController = {};

jwtController.create = function (req, res, next) {
  // build up payload based off results parameter of request object
  const payload = {
    userEmail: req.results.email,
    changedPW: req.results.changedPassword,
    isAdmin: req.results.isAdmin,
    dailyQuestions: req.results.dailyQuestions,
    takenQuiz: req.results.takenQuiz,
    quizAvailability: req.results.quizAvailability,
    firstName: req.results.firstName,
  };
  const options = {
    expiresIn: '2 days',
    issuer: req.results.email,
  };
  console.log('inside jwt controller');
  jwt.sign(payload, SECRET, options, function (err, token) {
    if (err) {
      console.log('here is an error ', err);
      next();
    } else {
      // add a token to the request object if there were no errors
      console.log('here is what a token looks like:', token);
      req.results.token = token;
      next();
    }
  });
};

// jwtController.verify = function (req, res, next) {
//
// };

module.exports = jwtController;

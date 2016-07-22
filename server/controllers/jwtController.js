'use strict';
const jwt = require('jsonwebtoken');
const moment = require('moment');
const SECRET = process.env.JWTSECRET || require('./../../privateKeys.js').jwtSecret;


const jwtController = {};

function getExpirationDate() {
  // setting todays date
const todaysDate = moment(Date.now()).utcOffset(-5).format('YYYY-MM-DD');
// this is what we set the expiration to
const time = new Date(`${todaysDate} 23:59:59.00`).getTime();
const diff = time - Date.now();
// expiresIn: time /1000;
return Math.floor(diff/1000);
}

jwtController.create = function (req, res, next) {
  // build up payload based off results parameter of request object
  const payload = {
    userEmail: req.results.email,
    changedPW: req.results.changedPassword,
    isAdmin: req.results.isAdmin,
    dailyQuestions: req.results.dailyQuestions,
    takenQuiz: req.results.takenQuiz,
    quizAvailability: req.results.quizAvailability,
    // quiz availability will be stale state!
    firstName: req.results.firstName,
  };


  const expiration = getExpirationDate();
  const options = {
    expiresIn: expiration,
    issuer: req.results.email,
  };

  console.log('inside jwt controller');
  jwt.sign(payload, SECRET, options, function (err, token) {
    if (err) {
      console.log('jwt token error ', err);
      next();
    } else {
      // add a token to the request object if there were no errors
      console.log('The Token was created Succesfully');
      req.results.token = token;
      next();
    }
  });
};

jwtController.verify = function (req, res, next) {
  if (req.body.token) {
    req.results = {};
    jwt.verify(req.body.token, SECRET, function(err, decoded){
      if (err) {
        console.log('verify token failed');
      }
      else {
        const payload = {
          userEmail: decoded.userEmail,
          changedPW: decoded.changedPW,
          isAdmin: decoded.isAdmin,
          dailyQuestions: decoded.dailyQuestions,
          takenQuiz: true,
          quizAvailability: decoded.quizAvailability,
          // quiz availability will be stale state!
          firstName: decoded.firstName,
        };
        const expiration = getExpirationDate();
        const options = {
          expiresIn: expiration,
          issuer: decoded.userEmail,
        };
        jwt.sign(payload, SECRET, options, function (err, token) {
          if (err) {
            console.log('jwt token error ', err);
            return res.send('Error with submitting results, jwt could not be verified!');
          } else {
            // add a token to the request object if there were no errors
            console.log('The Token was created Succesfully:');
            req.results.token = token;
            next();
          }
        });
      }
    });
  }
};

module.exports = jwtController;

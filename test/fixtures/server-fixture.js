'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var users = ['John', 'Betty', 'Hal'];

var state = {
  changedPassword: true,
  dailyQuestions: [1, 2, 3, 4, 5],
  email: 'Sandra@hi.com',
  firstName: 'Sandra',
  isAdmin: false,
  quizAvailability: true,
  takenQuiz: false,
};

app.use(bodyParser.json());

app.get('/users', function (req, res) {
  res.json(users);
});

app.post('/login', (req, res) => {
  console.log('inside the login page');
  if (req.body.password && req.body.emailAddress) {
    console.log('inside the success');
    res.statusCode = 200;
    res.send(JSON.stringify(state));
  } else {
    console.log('inside the failure');
    res.statusCode = 404;
    res.send('it failed!');
  }
});

app.post('/changePassword', (req, res) => {
  console.log('req.body.newPassword is ', req.body.newPassword);
  res.sendStatus(200);
})


var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Server running on port %d', port);
});


app.destroy = () => {
  process.exit();
};
module.exports = app;

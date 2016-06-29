'use strict';

const express = require('express');
const bodyParser = require('body-parser');
//require middleware which checks database to see if user was inputted
//var checkUser = require('./src/middleware.js')

// Constants
const PORT = 3000;

// App
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login', function (req, res) {
//expecting email and password in req.body
//will run this through middleware once db is setup
  res.send({'email':'test@email.com','password':'admin'});
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);

module.exports = app;

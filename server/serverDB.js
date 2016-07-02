'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const questionsDB = require('./questionsDB');
const Questions = require('./Questions/QuestionsModel');


// Verifying our DB connection
//  require middleware which checks database to see if user was inputted
//  var checkUser = require('./src/middleware.js')

// Constants
const PORT = 4000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './../')));

function creating(obj) {
  Questions.create(obj).then((questions) => {
    if (!questions) {
      throw new Error('did not create anything :(');
    }
    return questions;
  });
}

function pushData(req, res, next) {
  let i;
  for (i = 0; i < questionsDB.data.length; i++) {
    creating(questionsDB.data[i]);
  }
  next();
}
function showData(req, res, next) {
  Questions.findAll().then((questions) => {
    if (!questions || questions.length === 0) {
      throw new Error('Nothing in the Table!!!');
    }
    console.log(questions);
    req.final = questions;
    next();
  });
}


// The root route serves the main html page
app.get('/', pushData, showData, (req, res) => {
  res.send(req.final);
});


app.listen(PORT);
console.log('Running on http://localhost:' + PORT);

module.exports = app;

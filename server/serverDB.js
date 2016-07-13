'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const questionsDB = require('./questionsDB');
const Questions = require('./Questions/QuestionsModel');
const UserResponse = require('./UserResponse/UserResponseModel');


// Verifying our DB connection
//  require middleware which checks database to see if user was inputted
//  var checkUser = require('./src/middleware.js')

// Constants
const PORT = 4000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './../')));

const questionID = [75, 236, 190, 125, 141, 142, 37, 159, 118, 121, 87, 127, 45, 135, 223];
const answerID = ['A', 'B', 'E', 'C', 'E', 'C', 'C', 'A', 'E', 'A', 'D', 'A', 'E', 'E', 'E'];

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

function checkData (req, res, next) {
  const done = recursivelyUpdate(questionID, answerID);
  if (done) {
    next();
  }
}

function updateRow(updateObj, isCorrect) {
   updateObj.update({ respondedCorrectly: isCorrect }, { fields: ['respondedCorrectly'] })
  .then(() => true);
  //console.log('this is the object to be updated::::', updateObj);

}

function recursivelyUpdate(questionArr, answerArr) {
  if (questionArr.length > 0) {
    UserResponse.findAll({ questionid: questionArr[0] }).then((results) => {
      if (results.length > 0) {
        for (let i = 0; i < results.length; i++) {
          console.log('this is the subimttedAnswer::::' + results[i].submittedAnswer);
          console.log('this is the actual answer::::' + answerArr[0]);
          if (results[i].submittedAnswer === answerArr[0]) {
            updateRow(results[i], true);
          } else {
            updateRow(results[i], false);
          }
        }
      }
      recursivelyUpdate(questionArr.splice(1), answerArr.splice(1));
    });
  }
  return true;
}
function updateChosenTrue(updateObj) {
  updateObj.update({ chosen: true }, { fields: ['chosen'] })
  .then(() => true);
  // console.log('this is the object to be updated::::', updateObj);
}

function recursivelyChosenUpdate(questionArr) {
  if (questionArr.length > 0) {
    console.log('this is the questions Array', questionArr[0]);
    Questions.findAll({ questionid: questionArr[0] }).then((results) => {
      console.log('this is the results', results);
      if (results.length > 0) {
        updateChosenTrue(results[0]);
      }
      recursivelyChosenUpdate(questionArr.splice(1));
    });
  }
  return true;
}

function updateData(req, res, next) {
  const done = recursivelyChosenUpdate(questionID);

  if (done) {
    next();
  }
}


// The root route serves the main html page
app.get('/', updateData, (req, res) => {
  res.send(req.final);
});



// app.get('/update', checkData, (req, res) => {
//   res.send('successful Update');
// });

// app.get('/remove', (req, res) => {
//   const done = removeExtras(questionID);
//   if (done) {
//     res.send('successful removal!');
//   }
// });


app.listen(PORT);
console.log('Running on http://localhost:' + PORT);

module.exports = app;

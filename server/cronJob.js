'use strict';
const Questions = require('./Questions/QuestionsModel.js');
const dailyQuestions = require('./Questions/dailyQuestionsModel.js');
const CronJob = require('cron').CronJob;
const Users = require('./Users/UserModel.js');

function removeAndInsertIntoDailyQuestions(array) {
  dailyQuestions.sync();
  dailyQuestions.destroy({ where: {
    check: true,
  },
   });
  var dailyQs = dailyQuestions.build({
    question1: array[0],
    question2: array[1],
    question3: array[2],
  });
  dailyQs.save();
}



function update(questions, randomQ) {
  Questions.update(
    { chosen: true },
    { where: { questionid: questions[randomQ].dataValues.questionid } }
  ).then((result) => {
    return result;
  });
}

function forLoop(nonChosenQuestionCount, randomQ, array, questions) {
  for (let i = 0; i < 3; i++) {
    randomQ = Math.floor(Math.random() * nonChosenQuestionCount);
    array.push(questions[randomQ].dataValues.questionid);
    update(questions, randomQ, i);
  }
  //
}



function getRandomQ() {
  const array = [];
  Questions.findAll({ where:
    { chosen: false } }).then((questions) => {
      const nonChosenQuestionCount = questions.length;
      const randomQ = [];
      forLoop(nonChosenQuestionCount, randomQ, array, questions);
      removeAndInsertIntoDailyQuestions(array);
    });
    // want to return array that has 3 integer values
}

function setAvaiableToTrue() {
  dailyQuestions.update({available: true}, {where: {available:false}})
  .then(function(result) {
    console.log(result,' Succesfully updated');
  })
}

function setAvaiableToFalse() {
  dailyQuestions.update({available: false}, {where: {available:true}})
  .then(function(result) {
    console.log(result,' Succesfully updated');
  })
}

function runJob() {
  // var brendan = Users.build({
  //   userid: 70,
  //   firstname: 'Brendan',
  //   lastname: 'Del Rosario',
  //   email: 'test@demo.com',
  //   password: 'abc123',
  //   groupid: 1,
  //   adminFlag: false,
  //   changedPassword: false,
  // });
  // brendan.save();

  const job = new CronJob({
    cronTime: '50 13 22 * * 1-7',
    onTick: () => {
      Questions.sync();
      getRandomQ();
    },
    start: true,
    timeZone: 'America/Los_Angeles',
  });

  const releaseQuiz = new CronJob({
    cronTime: '00 00 06 * * 1-7',
    onTick: () => {
      Questions.sync();
      //update avaiable in dailytquestions db
      setAvaiableToTrue();
    },
    start: true,
    timeZone: 'America/Los_Angeles',
  });

  const closeQuiz = new CronJob({
    cronTime: '00 00 15 * * 1-7',
    onTick: () => {
      Questions.sync();
      //update avaiable in dailytquestions db
      setAvaiableToFalse();
    },
    start: true,
    timeZone: 'America/Los_Angeles',
  });
}
module.exports = runJob;

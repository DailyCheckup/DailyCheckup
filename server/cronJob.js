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
    check: true,
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

function runJob() {
  // var brendan = Users.build({
  //   userid: 69,
  //   firstname: 'Brendan',
  //   lastname: 'Del Rosario',
  //   email: 'brendan@deltaco.com',
  //   password: 'abc123',
  //   groupid: 1,
  //   adminFlag: false,
  //   changedPassword: false,
  // });
  // brendan.save();

  const job = new CronJob({
    cronTime: '00 22 18 * * 1-7',
    onTick: () => {
      Questions.sync();
      // var array = getRandomQuestionIDs();
      getRandomQ();
      // removeAndInsertIntoDailyQuestions(array);
    },
    start: true,
    timeZone: 'America/Los_Angeles',
  });
}
module.exports = runJob;

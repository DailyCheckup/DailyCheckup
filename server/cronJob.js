'use strict';
const Questions = require('./Questions/QuestionsModel.js');
const dailyQuestions = require('./Questions/dailyQuestionsModel.js');
const CronJob = require('cron').CronJob;
const Users = require('./Users/UserModel.js');
const NUM_OF_QUESTIONS = 5;
//if you change number of quesitons change dailyquestions model

function removeAndInsertIntoDailyQuestions(array) {
  var buildObj = {};
  dailyQuestions.sync();
  dailyQuestions.destroy({ where: {
    check: true,
  },
  });
  for (let i = 0; i < NUM_OF_QUESTIONS; i++) {
    const key = `question${i + 1}`
    buildObj[key] = array[i]
  }
  const dailyQs = dailyQuestions.build(buildObj);
  dailyQs.save();
}



function update(questions, randomQ) {
  Questions.update(
    { chosen: true },
    { where: { questionid: questions[randomQ].dataValues.questionid } }
  ).then((result) => result);
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
    cronTime: '00 00 03 * * 1-7',
    onTick: () => {
      Questions.sync();
      getRandomQ();
    },
    start: true,
    timeZone: 'America/Los_Angeles',
  });

  const releaseQuiz = new CronJob({
    cronTime: '00 00 10 * * 1-7',
    onTick: () => {
      Questions.sync();
      //update avaiable in dailytquestions db
      setAvaiableToTrue();
    },
    start: true,
    timeZone: 'America/Los_Angeles',
  });

  const closeQuiz = new CronJob({
    cronTime: '00 00 22 * * 1-7',
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

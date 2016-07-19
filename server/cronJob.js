'use strict';
const Questions = require('./Questions/QuestionsModel.js');
const dailyQuestions = require('./Questions/dailyQuestionsModel.js');
const GroupData = require('./Questions/groupDataModel.js');
const CronJob = require('cron').CronJob;
const Users = require('./Users/UserModel.js');
const NUM_OF_QUESTIONS = 5;
const moment = require('moment');
//if you change number of quesitons change dailyquestions model

function buildGroupData (questions) {
  const dateTimeZoneAdjusted = moment(Date.now());
  const formattedDate = moment(dateTimeZoneAdjusted).format('YYYY-MM-DD');
  const createRowsArray = [];
  for (let i = 0; i < questions.length; i++) {
    let obj = {};
    obj.questionid = questions[i].dataValues.questionid;
    obj.date = formattedDate;
    obj.question = questions[i].dataValues.question;
    obj.answer = questions[i].dataValues.answer;
    obj.reason = questions[i].dataValues.reason;
    obj.genre = questions[i].dataValues.genre;
    obj.a_option = questions[i].dataValues.a;
    obj.b_option = questions[i].dataValues.b;
    obj.c_option = questions[i].dataValues.c;
    obj.d_option = questions[i].dataValues.d;
    obj.e_option = questions[i].dataValues.e;
    createRowsArray.push(obj);
  }
  return createRowsArray;
}



function setDailyGroupData(questionIDsArray) {
  Questions.findAll({ where: {questionid: questionIDsArray } })
  .then((questions) => {
    const todaysDataToAdd = buildGroupData(questions);
    GroupData.bulkCreate(todaysDataToAdd);
  });
}

function getQuestionIDs() {
  const questionIDsArray = [];
  dailyQuestions.findOne({ where: { check: true } })
  .then((questions) => {
    // console.log(questions.dataValues);
    for (let i = 0; i < NUM_OF_QUESTIONS; i++) {
      let id = `question${i + 1}`;
      questionIDsArray.push(questions.dataValues[id]);
    }
    setDailyGroupData(questionIDsArray);
  });
}

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
  var randomNums = [];
  for (let i = 0; i < NUM_OF_QUESTIONS; i++) {
    var randomQ = Math.floor(Math.random() * nonChosenQuestionCount);
    while(randomNums.indexOf(randomQ) !== -1) {
      randomQ = Math.floor(Math.random() * nonChosenQuestionCount);
    }
    array.push(questions[randomQ].dataValues.questionid);
    update(questions, randomQ, i);
  }
}

function getRandomQ() {
  const array = [];
  Questions.findAll({ where:
    { chosen: false } }).then((questions) => {
      const nonChosenQuestionCount = questions.length;
      const randomQ = [];
      forLoop(nonChosenQuestionCount, randomQ, array, questions);
      removeAndInsertIntoDailyQuestions(array);
      // array is N number of unique question ids
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

// this is releasing the daily questions
// setting 5 empty rows in groupdata table
  const job = new CronJob({
    cronTime: '00 00 22 * * 0-4',
    onTick: () => {
      Questions.sync();
      getRandomQ();
    },
    start: true,
    timeZone: 'America/Los_Angeles',
  });

  const job2 = new CronJob({
    cronTime: '30 00 22 * * 0-4',
    onTick: () => {
      getQuestionIDs();
    },
    start: true,
    timeZone: 'America/Los_Angeles',
  });
  // const releaseQuiz = new CronJob({
  //   cronTime: '00 00 10 * * 1-5',
  //   onTick: () => {
  //     Questions.sync();
  //     //update avaiable in dailytquestions db
  //     setAvaiableToTrue();
  //   },
  //   start: true,
  //   timeZone: 'America/Los_Angeles',
  // });
  //
  // const closeQuiz = new CronJob({
  //   cronTime: '00 00 22 * * 1-5',
  //   onTick: () => {
  //     Questions.sync();
  //     //update avaiable in dailytquestions db
  //     setAvaiableToFalse();
  //   },
  //   start: true,
  //   timeZone: 'America/Los_Angeles',
  // });
}
module.exports = runJob;

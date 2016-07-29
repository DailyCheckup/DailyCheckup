'use strict';
const Questions = require('./Questions/QuestionsModel.js');
const dailyQuestions = require('./Questions/dailyQuestionsModel.js');
const GroupData = require('./Questions/groupDataModel.js');
const CronJob = require('cron').CronJob;
const Users = require('./Users/UserModel.js');
const NUM_OF_QUESTIONS = 5;
const moment = require('moment');
//if you change number of quesitons change dailyquestions model

// builds the groupdata obj that will be added to the groupdata table
function buildGroupData(questions) {
  const dateTimeZoneAdjusted = moment(Date.now()).utcOffset(+2);
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

// takes the question ids an finds all questions in questions
// adds the groupdata object to be added to the groupdata table
function setDailyGroupData(questionIDsArray) {
  Questions.findAll({ where: { questionid: questionIDsArray } })
  .then((questions) => {
    const todaysDataToAdd = buildGroupData(questions);
    GroupData.bulkCreate(todaysDataToAdd);
  });
}

// grabs all the daily question ids and then sets all the
// key value pairs to the given ids
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

// removes the current row from the daily questions table
// then adds the new array of N questionids into the table
// maximum ever one row in this table
function removeAndInsertIntoDailyQuestions(array) {
  const buildObj = {};
  dailyQuestions.sync();
  dailyQuestions.destroy({ where: {
    check: true,
  },
  });
  for (let i = 0; i < NUM_OF_QUESTIONS; i++) {
    const key = `question${i + 1}`;
    buildObj[key] = array[i];
  }
  const dailyQs = dailyQuestions.build(buildObj);
  dailyQs.save();
}

// changes each questionid that has been chosen todays
// sets the flag to true
function updateChosen(questions, i) {
  Questions.update(
    { chosen: true },
    { where: { questionid: questions[i].dataValues.questionid } }
  ).then((result) => result);
}

// randomizes array elements using the Durstenfeld shuffle
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// finds all question rows in the table that have the
// the flad chosen set to false
function getRandomQ() {
  Questions.findAll({ where:
    { chosen: false } }).then((questions) => {
      const nonChosenQuestionCount = questions.length;
      const shuffledQuestions = shuffleArray(questions);
      const questionArr = [];
      // adds the questionid to an array and updates chosen
      for (let i = 0; i < NUM_OF_QUESTIONS; i++) {
        questionArr.push(shuffledQuestions[i].dataValues.questionid);
        updateChosen(shuffledQuestions, i);
      }
      removeAndInsertIntoDailyQuestions(questionArr);
      // array is N number of unique question ids
    });
    // want to return array that has 3 integer values
}

// turns avaiable flag in the dailyQuestions table to true
function setAvaiableToTrue() {
  dailyQuestions.update({available: true}, {where: {available:false}})
  .then(function(result) {
    console.log(result,' Succesfully updated');
  })
}

// turns avaiable flag in the dailyQuestions table to false
function setAvaiableToFalse() {
  dailyQuestions.update({available: false}, {where: {available:true}})
  .then(function(result) {
    console.log(result,' Succesfully updated');
  })
}


function runJob() {
// this is releasing the daily questions
  const setDailyQuestions = new CronJob({
    // runs every weekday at 12:00am (CST)
    cronTime: '00 00 22 * * 0-4',
    onTick: () => {
      Questions.sync();
      getRandomQ();
    },
    start: true,
    timeZone: 'America/Los_Angeles',
  });

  // setting 5 empty rows in groupdata table
  const setGroupDataTable = new CronJob({
    // runs every weekday at 12:00:30am (CST)
    cronTime: '30 00 22 * * 0-4',
    onTick: () => {
      getQuestionIDs();
    },
    start: true,
    timeZone: 'America/Los_Angeles',
  });

  const closeQuiz = new CronJob({
    // runs every weekday at 12:00:40am (CST)
    // closes quiz availibity by changing flag in DB
    cronTime: '40 00 22 * * 0-4',
    onTick: () => {
      Questions.sync();
      // update avaiable in dailytquestions db
      setAvaiableToFalse();
    },
    start: true,
    timeZone: 'America/Los_Angeles',
  });

  const releaseQuiz = new CronJob({
    // runs every weekday at 12:00:50am (CST)
    // opens quiz availibity by changing flag in DB
    cronTime: '50 00 22 * * 0-4',
    onTick: () => {
      Questions.sync();
      // update avaiable in dailytquestions db
      setAvaiableToTrue();
    },
    start: true,
    timeZone: 'America/Los_Angeles',
  });
}
module.exports = runJob;

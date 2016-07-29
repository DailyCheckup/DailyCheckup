'use strict';
const groupData = require('./../Questions/groupDataModel.js');
const dailyQuestionsData = require('./dailyQuestionsDataController.js');

const questionDifficulty = {
  // Gather all group data
  gatherQuestionsByDifficulty(req, res, next) {
    groupData.findAll({
      where: {
        questionid: {
          $gt: 0
        }
      }
    }).then((questionResults) => {
      // An array of question objects. Grab the dataValues
      const allQuestions = questionResults.map(function (result) {
        return result.dataValues;
      });
      let questionDifficultyObj = {
        easy: [],
        medium: [],
        hard: [],
      };
      // For each question, determine which difficulty category it falls under and add it
      // to the appropriate array
      allQuestions.forEach(function (question) {
        const percentCorrect = question.num_of_people_correct / question.num_of_people_total;
        if (percentCorrect >= 0.8) {
          questionDifficultyObj.easy.push(question);
        } else if (percentCorrect >= 0.51) {
          questionDifficultyObj.medium.push(question);
        } else if (percentCorrect >= 0) {
          questionDifficultyObj.hard.push(question);
        }
      });
      // For each difficulty category...
      Object.keys(questionDifficultyObj).forEach(function (difficulty) {
        // Go through each question in the difficulty category array...
        questionDifficultyObj[difficulty].forEach(function (question) {
          // Build a column chart for each question and add it to a columnChartArray property
          question.columnChartArray = dailyQuestionsData.buildColumnChartData(question);
        });
      });
      req.results.questionDifficultyData = questionDifficultyObj;
      next();
    });
  },
};

module.exports = questionDifficulty;


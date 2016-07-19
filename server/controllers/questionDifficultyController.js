'use strict';
const groupData = require('./../Questions/groupDataModel.js');
const dailyQuestionsData = require('./dailyQuestionsDataController.js');

const questionDifficulty = {

  gatherQuestionsByDifficulty(req, res, next) {
    groupData.findAll({
      where: {
        questionid: {
          $gt: 0
        }
      }
    }).then((questionResults) => {
      const allQuestions = questionResults.map(function (result) {
        return result.dataValues;
      });
      console.log('all questions length ', allQuestions.length);
      let questionDifficultyObj = {
        Easy: [],
        Medium: [],
        Hard: [],
      };
      allQuestions.forEach(function (question) {
        const percentCorrect = question.num_of_people_correct / question.num_of_people_total;
        if (percentCorrect >= 0.8) {
          questionDifficultyObj.Easy.push(question);
        } else if (percentCorrect >= 0.5) {
          questionDifficultyObj.Medium.push(question);
        } else if (percentCorrect >= 0) {
          questionDifficultyObj.Hard.push(question);
        }
      });
      Object.keys(questionDifficultyObj).forEach(function (difficulty) {
        questionDifficultyObj[difficulty].forEach(function (question) {
          question.columnChartArray = dailyQuestionsData.buildColumnChartData(question);
        });
      });
      //console.log('question difficulty object ', questionDifficultyObj);
      console.log('num of easy qs ', questionDifficultyObj.Easy.length);
      console.log('num of medium qs ', questionDifficultyObj.Medium.length);
      console.log('num of hard qs ', questionDifficultyObj.Hard.length);
      req.results.questionDifficultyData = questionDifficultyObj;
      next();
    });
  },
};

module.exports = questionDifficulty;


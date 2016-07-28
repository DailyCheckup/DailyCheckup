'use strict';
const groupData = require('./../Questions/groupDataModel.js');
const moment = require('moment');
const dateTimeZoneAdjusted = moment(Date.now()).utcOffset(-5);
const todaysDate = moment(dateTimeZoneAdjusted).format('YYYY-MM-DD');

const dailyResults = {

  dailyQuestionsResults(req, res, next) {
    // Find group data rows with today's date
    groupData.findAll({
      where: {
        date: todaysDate,
      }
    }).then((dayResults) => {
      // Daily results is an array of question objects, grab the dataValues
      let results = dayResults.map(function (result) {
        return result.dataValues;
      });
      // Create a column chart array for each question and store it in a columnChartArray property
      results.forEach(function (result) {
        result.columnChartArray = dailyResults.buildColumnChartData(result);
      });
      // Check if no quizzes have been taken during the day
      if (results[0].num_of_people_total === 0) {
        results = 'No quizzes have been taken today';
      }
      // Create a results obj to store the gathered data
      req.results = {};
      // Todays results is an array of question objects
      req.results.todaysResults = results;
      next();
    });
  },

  buildColumnChartData(data) {
    // Data is one question obj
    const columnChartData = [];
    const columnAxes = ['Selection', 'Count', { role: 'style' }];
    columnChartData.push(columnAxes);
    const selections = ['A', 'B', 'C', 'D', 'E', 'N'];
    selections.forEach(function (select) {
      // Column colors only work for traditional charts, not material charts
      let selectLetter = select;
      let color = 'color: #536DFE';
      if (data.answer === select) {
        color = 'color: #66BB6A';
      }
      if (selectLetter === 'N') {
        selectLetter = 'N/A';
      }
      // Add a row to the column chart with the letter,
      // number of people that chose that letter,
      // and the color of the column
      columnChartData.push([selectLetter, data[`${select.toLowerCase()}_count`], color]);
    });
    return columnChartData;
  },
};

module.exports = dailyResults;

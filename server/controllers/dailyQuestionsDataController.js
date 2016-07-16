'use strict';
const groupData = require('./../Questions/groupDataModel.js');
const moment = require('moment');
const todaysDate = moment(Date.now()).format('YYYY-MM-DD');

const dailyResults = {

  dailyQuestionsResults(req, res, next) {
    groupData.findAll({
      where: {
        date: todaysDate
      }
    }).then((dayResults) => {
      // daily results is an array of objects, grab the dataValues
      let results = dayResults.map(function (result) {
        return result.dataValues;
      });
      // Create column chart arrays
      results.forEach(function (result) {
        result.columnChartArray = dailyResults.buildColumnChartData(result);
      });
      if (results.length === 0) {
        results = 'No quizzes have been taken today';
      }
      req.results = {};
      req.results.todaysResults = results;
      next();
    });
  },

  buildColumnChartData(data) {
    const columnChartData = [];
    // Need to add {role: 'style'} for colors to column axis
    const columnAxes = ['Selection', 'Count', {role: 'style'}];
    columnChartData.push(columnAxes);
    const selections = ['A', 'B', 'C', 'D', 'E', 'N'];
    selections.forEach(function (select) {
      // Works only for traditional charts, not material charts
      let color = 'color: #536DFE';
      if (data.answer === select) {
        color = 'color: #66BB6A';
      }
      columnChartData.push([select, data[select.toLowerCase() + '_count'], color]);
    });
    return columnChartData;
  },
};

module.exports = dailyResults;

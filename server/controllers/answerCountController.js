'use strict';
const groupData = require('./../Questions/groupDataModel.js');
const moment = require('moment');
const todaysDate = moment(Date.now()).format('YYYY-MM-DD');

const answerCount = {

  dailyQuestionData(req, res, next) {
    groupData.findAll({
      where: {
        date: '2016-07-11'
      }
    }).then((dailyResults) => {
      // daily results is an array of objects, grab the dataValues
      let results = dailyResults.map(function (result) {
        return result.dataValues;
      });
      // Create column chart arrays
      results.forEach(function (result) {
        result.columnChartArray = answerCount.buildColumnChartData(result);
      });
      req.todaysResults = results;
      next();
    });
  },

  buildColumnChartData(data) {
    const columnChartData = [];
    // Need to add {role: 'style'} for colors to column axis
    const columnAxes = ['Selection', 'Count', {role: 'style'}];
    columnChartData.push(columnAxes);
    const selections = ['A', 'B', 'C', 'D', 'E'];
    selections.forEach(function (select) {
      // Works only for traditional charts, not material charts
      let color = 'color: #1976d2';
      if (data.answer === select) {
        console.log('inside if statement');
        color = 'color: #009933';
      }
      columnChartData.push([select, data[select.toLowerCase() + '_count'], color]);
    });
    return columnChartData;
  },
};

module.exports = answerCount;

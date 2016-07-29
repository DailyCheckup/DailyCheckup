'use strict';
const groupData = require('./../Questions/groupDataModel.js');

const genreData = {

  gatherResultsByGenre(req, res, next) {
    groupData.findAll({
      attributes: ['genre', 'num_of_people_correct', 'num_of_people_incorrect', 'num_of_people_total', 'questionid'],
      where: { genre: ['OB', 'GI', 'GU', 'Endocrine', 'Preventative Health', 'Orthopedic', 'PEDS', 'GYN'] }
    }).then((results) => {
      // Genres is an array of question objects
      let genres = results.map(function (result) {
        return result.dataValues;
      });
      let genreCountObj = {};
      // For each question object...
      genres.forEach(function (genreObj) {
        // If the genre already exists in the object, push the questionid and increment the other properties
        if (genreCountObj[genreObj.genre]) {
          genreCountObj[genreObj.genre].questionids.push(genreObj.questionid);
          genreCountObj[genreObj.genre].num_of_people_correct += genreObj.num_of_people_correct;
          genreCountObj[genreObj.genre].num_of_people_incorrect += genreObj.num_of_people_incorrect;
          genreCountObj[genreObj.genre].num_of_people_total += genreObj.num_of_people_total;
        // Else, create a genre object and set up the properties
        } else {
          genreCountObj[genreObj.genre] = {};
          genreCountObj[genreObj.genre].questionids = [genreObj.questionid];
          genreCountObj[genreObj.genre].num_of_people_correct = genreObj.num_of_people_correct;
          genreCountObj[genreObj.genre].num_of_people_incorrect = genreObj.num_of_people_incorrect;
          genreCountObj[genreObj.genre].num_of_people_total = genreObj.num_of_people_total;
        }
      });
      // Add the column chart data to the genreChartData property
      genreCountObj.genreChartData = genreData.buildColumnChartData(genreCountObj);
      req.results.genreResults = genreCountObj;
      next();
    });
  },

  buildColumnChartData(data) {
    const columnChartData = [];
    // Tooltips are the boxes that appear on hover over each column to
    // provide additional information about the column
    const columnAxes = ['Genre', 'Percent Correct', { role: 'tooltip' }];
    columnChartData.push(columnAxes);
    const genres = ['OB', 'GI', 'GU', 'Endocrine', 'Preventative Health', 'Orthopedic', 'PEDS', 'GYN'];
    genres.forEach(function (genre) {
      const percentCorrect = data[genre].num_of_people_correct / data[genre].num_of_people_total;
      const percentWholeNum = Math.round(100 * percentCorrect);
      columnChartData.push([genre, percentCorrect, `${percentWholeNum}% correct out of ${data[genre].questionids.length} questions given.`]);
    });
    return columnChartData;
  },
};

module.exports = genreData;

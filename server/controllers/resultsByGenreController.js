'use strict';
const groupData = require('./../Questions/groupDataModel.js');

const genreData = {

  gatherResultsByGenre(req, res, next) {
    groupData.findAll({
      attributes: ['genre', 'num_of_people_correct', 'num_of_people_incorrect', 'num_of_people_total', 'questionid'],
      where: { genre: ['OB', 'GI', 'GU', 'Endocrine', 'Preventative Health', 'Orthopedic', 'PEDS', 'GYN'] }
    }).then((results) => {
      console.log('results length', results.length);
      let genres = results.map(function (result) {
        return result.dataValues;
      });
      let genreCountObj = {};
      genres.forEach(function (genreObj) {
        if (genreCountObj[genreObj.genre]) {
          genreCountObj[genreObj.genre].questionids.push(genreObj.questionid);
          genreCountObj[genreObj.genre].num_of_people_correct += genreObj.num_of_people_correct;
          genreCountObj[genreObj.genre].num_of_people_incorrect += genreObj.num_of_people_incorrect;
          genreCountObj[genreObj.genre].num_of_people_total += genreObj.num_of_people_total;
        } else {
          genreCountObj[genreObj.genre] = {};
          genreCountObj[genreObj.genre].questionids = [genreObj.questionid];
          genreCountObj[genreObj.genre].num_of_people_correct = genreObj.num_of_people_correct;
          genreCountObj[genreObj.genre].num_of_people_incorrect = genreObj.num_of_people_incorrect;
          genreCountObj[genreObj.genre].num_of_people_total = genreObj.num_of_people_total;
        }
      });
      genreCountObj.genreChartData = genreData.buildColumnChartData(genreCountObj);
      console.log('genre count obj ', genreCountObj);
      req.results.genreResults = genreCountObj;
      next();
    });
  },

  buildColumnChartData(data) {
    const columnChartData = [];
    const columnAxes = ['Genre', 'Percent Correct', {role: 'tooltip'}];
    columnChartData.push(columnAxes);
    const selections = ['OB', 'GI', 'GU', 'Endocrine', 'Preventative Health', 'Orthopedic', 'PEDS', 'GYN'];
    selections.forEach(function (select) {
      const percentCorrect = data[select].num_of_people_correct / data[select].num_of_people_total;
      const percentWholeNum = Math.round(100 * percentCorrect);
      columnChartData.push([select, percentCorrect, `${percentWholeNum}% correct out of ${data[select].questionids.length} questions given.`]);
    });
    return columnChartData;
  },
};

module.exports = genreData;

'use strict';
const Questions = require('./../Questions/QuestionsModel');

const ChosenController = {};

const questionID = [70, 17, 92, 109, 239, 37, 159, 118, 121, 142, 236, 190, 141, 125, 75, 87, 223, 135, 45, 127, 225, 148, 85, 63, 119, 180, 213, 74, 221];

ChosenController.resetChosenToFalse = function (req, res, next) {
  console.log('setting to false');
  Questions.update({ chosen: false }, { where: {} }).then((questions) => {
    next();
  });
}

ChosenController.setChosenToTrue = function (req, res, next) {
  console.log('setting to true');
  Questions.update({ chosen: true }, { where: { questionid: questionID } }).then((questions) => {
    next();
  });
};

module.exports = ChosenController;

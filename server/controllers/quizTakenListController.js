'use strict';
const Users = require('./../Users/UserModel.js');

const quizTakenListData = {

  // Find all users with an Aspirus email address
  findAllResidents(req, res, next) {
    Users.findAll({
      where: {
        email: {
          $iLike: '%@aspirus.org'
        }
      }
    }).then((emails) => {
      // Create an array of objects with each user's email address and first and last name
      let results = emails.map(function (user) {
        const residentObj = {};
        residentObj.email = user.dataValues.email;
        residentObj.name = `${user.dataValues.firstname} ${user.dataValues.lastname}`;
        return residentObj;
      });
      // Build list of users by combining all users (results) and the users who have taken
      // the quiz today (takenQuizEmailObj)
      const quizTakenDataArray = quizTakenListData.buildListData(results, req.results.takenQuizEmailObj);
      req.results.takenQuizListData = quizTakenDataArray;
      next();
    });
  },

  buildListData(allResidents, quizTaken) {
    const listData = [];
    const tableHeaders = ['Name', 'Taken Quiz', 'No. Correct'];
    listData.push(tableHeaders);
    // Go through all Aspirus users
    allResidents.forEach(function (resident) {
      // Grab the number of questions the user got correct
      // TakenQuizObj stores email: num correct as key value pairs
      let numCorrect = quizTaken[resident.email];
      // If the user isn't in the quiz taken object, set num correct to 0
      if (!numCorrect) {
        numCorrect = 0;
      }
      listData.push([resident.name, resident.email in quizTaken, numCorrect]);
    });
    return listData;
  },
};

module.exports = quizTakenListData;

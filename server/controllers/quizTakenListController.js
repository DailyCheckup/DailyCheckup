'use strict';
const Users = require('./../Users/UserModel.js');

const quizTakenListData = {
  
  findAllResidents(req, res, next) {
    Users.findAll({
      where: {
        email: {
          $iLike: '%@aspirus.org'
        }
      }
    }).then((emails) => {
      let results = emails.map(function (user) {
        const residentObj = {};
        residentObj.email = user.dataValues.email;
        residentObj.name = `${user.dataValues.firstname} ${user.dataValues.lastname}`;
        return residentObj;
      });
      const quizTakenDataArray = quizTakenListData.buildListData(results, req.results.takenQuizEmailObj);
      req.results.takenQuizListData = quizTakenDataArray;
      next();
    });
  },

  buildListData(allResidents, quizTaken) {
    console.log('all redidents ', allResidents);
    console.log('quiz taken ', quizTaken);
    const listData = [];
    const tableHeaders = ['Name', 'Taken Quiz', 'No. Correct'];
    listData.push(tableHeaders);
    allResidents.forEach(function (resident) {
      let numCorrect = quizTaken[resident.email];
      if (!numCorrect) {
        numCorrect = 0;
      }
      listData.push([resident.name, resident.email in quizTaken, numCorrect]);
    });
    return listData;
  },
};

module.exports = quizTakenListData;

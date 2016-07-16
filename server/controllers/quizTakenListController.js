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
      const quizTakenDataArray = quizTakenListData.buildListData(results, req.results.takenQuizEmailArray);
      req.results.takenQuizListData = quizTakenDataArray;
      next();
    });
  },

  buildListData(allResidents, quizTaken) {
    const listData = [];
    const tableHeaders = ['Name', 'Taken Quiz'];
    listData.push(tableHeaders);
    allResidents.forEach(function (resident) {
      listData.push([resident.name, quizTaken.indexOf(resident.email) > -1]);
    });
    return listData;
  },
};

module.exports = quizTakenListData;

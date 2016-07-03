const UserResponse = require('./../UserResponse/UserResponseModel');

module.exports = {

  checkQuizWasTaken(req, res, next) {
    const dailyQuestions = req.results.dailyQuestions;
    const userEmail = req.results.email;
    const dailyQuestionIds = dailyQuestions.map(function (question) {
      return question.questionid;
    });
    UserResponse.findAll({
      where: { email: userEmail, questionid: dailyQuestionIds[0] }
    }).then(function (results) {
      if (!results.length) {
        req.results.takenQuiz = false;
      } else {
        req.results.takenQuiz = true;
      }
      next();
    });
  },

};
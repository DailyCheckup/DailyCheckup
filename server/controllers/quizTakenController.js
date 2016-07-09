const UserResponse = require('./../UserResponse/UserResponseModel');
const DailyQuestions = require('./../Questions/dailyQuestionsModel');

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
      if(userEmail === 'demo') {
        req.results.takenQuiz = false;
      } else if (!results.length) {
        req.results.takenQuiz = false;
      } else {
        req.results.takenQuiz = true;
      }
      next();
    });
  },

  checkQuizAvailability( req, res, next) {
    DailyQuestions.findAll({ where: { available: true } }).then(function(result) {
      if (req.body.emailAddress === 'demo') {
        req.results.quizAvailability = true;
      } else if (!result.length) {
        req.results.quizAvailability = false;
      } else {
        req.results.quizAvailability = true;
      }
      next();
    });
  }

};

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const loginCheck = require('./controllers/loginCheck.js');
const UserResponseController = require('./controllers/userResponseController');
const changePW = require('./controllers/changePassword.js');
const quizTakenController = require('./controllers/quizTakenController.js');
const dailyQuestionsData = require('./controllers/dailyQuestionsDataController.js');
const resultsByGenre = require('./controllers/resultsByGenreController.js');
const questionDifficultyData = require('./controllers/questionDifficultyController.js');
const quizTakenList = require('./controllers/quizTakenListController.js');
const jwtController = require('./controllers/jwtController.js');
const runJob = require('./cronJob.js');

// const Sequelize = require('sequelize');
// const gatherResults = require('./controllers/gatherResultsController.js');
// const calculateStats = require('./controllers/calculateStatsController.js');
// const ChosenController = require('./controllers/chosenController.js');
// const allRows = require('./controllers/resultsTable.js');
// const groupData = require('./Questions/groupDataModel.js');

// Constants
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './../')));
runJob();
// The root route serves the main html page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/', 'main.html'));
});

// Post requests to the login route validates email and password
app.post('/login',
  loginCheck.validUser,
  // loginCheck.isAdmin,
  // loginCheck.firstLogin,
  loginCheck.getQuestions,
  quizTakenController.checkQuizWasTaken,
  quizTakenController.checkQuizAvailability,
  jwtController.create,
  (req, res) => {
    res.send(JSON.stringify(req.results));
  });

// Post requests to change password changes user's pw in the db
app.post('/changePassword', changePW.changePasswordInDB, function (req, res) {
  res.statusCode = 200;
  res.send(JSON.stringify('Succesfully updated password'));
});

app.post('/residentResults',
  dailyQuestionsData.dailyQuestionsResults,
  function (req, res) {
    res.statusCode = 200;
    res.send(JSON.stringify(req.results));
});

app.post('/directorResults',
  dailyQuestionsData.dailyQuestionsResults,
  resultsByGenre.gatherResultsByGenre,
  quizTakenController.allWhoHaveTakenQuiz,
  quizTakenList.findAllResidents,
  questionDifficultyData.gatherQuestionsByDifficulty,
  // gatherResults.isUserAdmin,
  // calculateStats.questionResultsPerDay,
  // gatherResults.gatherQuestions,
  // gatherResults.addQuestionInfoToResults,
  function (req, res) {
    res.statusCode = 200;
    res.send(JSON.stringify(req.results));
});

app.post('/userResponse',
jwtController.verify,
UserResponseController.addResults,
UserResponseController.postToGroupDataTable,
 function(req, res) {
   res.send(JSON.stringify(req.results));
 });

// app.get('/reset', ChosenController.resetChosenToFalse, ChosenController.setChosenToTrue, (req, res) => {
//   res.send('send successful reset');
// })
// For all other requests, serve main html page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/', 'main.html'));
});

// groupData.bulkCreate(allRows).then(function() {
//   console.log('created rows in table');
// });

app.listen(port);

app.destroy = () => {
  process.exit();
};
console.log('Running on http://localhost:' + port);

module.exports = app;

// OLD BOILER PLATE FOR WEBPACK IMPROVEMENTS

// const webpack = require('webpack');
// const WebpackDevServer = require('webpack-dev-server');
// const config = require('../webpack.config');

// app.get('/app.js', (req, res) => {
//   if (process.env.PRODUCTION) {
//     res.sendFile(__dirname + '/build/build.js');
//   } else {
//     res.redirect('//localhost:9090/build/build.js');
//   }
// });

// Serve aggregate stylesheet depending on environment
// NEED TO UPDATE WHEN WE HAVE STYLES
// app.get('/style.css', (req, res) => {
//   if (process.env.PRODUCTION) {
//     res.sendFile(__dirname + '/client/style.css');
//   } else {
//     res.redirect('//localhost:9090/client/style.css');
//   }
// });

// new WebpackDevServer(webpack(config), {
//   publicPath: config.output.publicPath,
//   hot: true,
//   noInfo: true,
//   historyApiFallback: true,
// }).listen(9090, 'localhost', (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log('webpack i think');
// });

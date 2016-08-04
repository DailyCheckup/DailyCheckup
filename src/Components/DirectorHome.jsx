const React = require('react');
import { Link } from 'react-router';
const AJAX = require('./AJAX.js');
const QuizTakenTable = require('./../Graphs/QuizTakenList.jsx');

const DirectorHome = React.createClass({

  componentDidMount() {
    AJAX.getRequest('/directorResults', this.printData, this.error);
  },

  error() {
    throw new Error('Post request error');
  },

  printData(results) {
    const dailyData = JSON.parse(results);
    this.props.setDirectorState({
      dailyQuestionData: dailyData.todaysResults,
      genreData: dailyData.genreResults,
      takenQuizData: dailyData.takenQuizListData,
      questionDifficultyData: dailyData.questionDifficultyData,
    });
  },

  buildQuizTakenTable() {
    let quizTaken = '';
    if (this.props.directorState.takenQuizData.length > 0) {
      quizTaken = (<QuizTakenTable data={this.props.directorState.takenQuizData} />);
    }
    return quizTaken;
  },

  render() {

    const quizTakenTable = this.buildQuizTakenTable();
    
    return (
      <div className="directorHome">
        <Link to='/director/todaysQuiz'> Todays Quiz </Link>
        <Link to='/director/results'> Group Stats </Link>
        <Link to='/director/settings'> Settings </Link>
        {quizTakenTable}
      </div>
    );
  },
});

module.exports = DirectorHome;

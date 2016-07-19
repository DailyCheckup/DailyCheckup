const React = require('react');
import { Link } from 'react-router';
//const drawPieChart = require('./../Graphs/pieChart.js');
const AJAX = require('./AJAX.js');
const QuizTakenTable = require('./../Graphs/QuizTakenList.jsx');

const DirectorHome = React.createClass({

  componentDidMount() {
    const postObj = {
      isAdmin: this.props.getState.isAdmin,
      email: this.props.getState.userEmail,
      takenQuiz: this.props.getState.takenQuiz,
    };
    console.log('post obj ', postObj);
    AJAX.postRequest('/directorResults', postObj, this.printData, this.error);
    // add more charts with more set on load callback functions
    //google.charts.setOnLoadCallback(drawPieChart.drawChart);
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
    });
    console.log('response data ', results);
  },

  buildQuizTakenTable() {
    let quizTaken = '';
    if (this.props.directorState.takenQuizData.length > 0) {
      quizTaken = (<QuizTakenTable data={this.props.directorState.takenQuizData} />);
    }
    return quizTaken;
  },

  render() {

    // const columnGraphArray = this.buildDailyGraphs();
    // const genreGraph = this.buildGenreGraph();
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

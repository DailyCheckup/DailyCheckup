const React = require('react');
import { Link } from 'react-router';
//const drawPieChart = require('./../Graphs/pieChart.js');
const drawColumnChart = require('./../Graphs/columnChart.js');
const AJAX = require('./AJAX.js');
const DailyColumnChart = require('./../Graphs/DailyColumnChart.jsx');
const GenreChart = require('./../Graphs/GenreChart.jsx');

google.charts.load('current', {'packages':['corechart', 'bar']});

const DirectorHome = React.createClass({

  getInitialState() {
    return ({
      dailyQuestionData: [],
      genreResults: '',
    });
  },

  componentDidMount() {
    console.log('inside component did mount');
    const postObj = {
      isAdmin: this.props.getState.isAdmin,
      email: this.props.getState.userEmail,
      takenQuiz: this.props.getState.takenQuiz,
    };
    console.log('post obj ', postObj);
    AJAX.postRequest('/results', postObj, this.printData, this.error);
    // add more charts with more set on load callback functions
    //google.charts.setOnLoadCallback(drawPieChart.drawChart);
  },

  error() {
    console.log('Error!!! with the post request');
  },

  printData(results) {
    const dailyData = JSON.parse(results);
    this.setState({
      dailyQuestionData: dailyData.todaysResults,
      genreData: dailyData.genreResults
    });
    console.log('response data ', results);
  },

  buildDailyGraphs() {
    let columnGraphArray = [];
    if (this.state.dailyQuestionData.length === 0) {
      columnGraphArray = (<p>Loading...</p>);
    } else if (typeof this.state.dailyQuestionData === 'string') {
      columnGraphArray = (<p>No quizzes have been submitted yet today.</p>);
    } else {
      for (let i = 0; i < this.state.dailyQuestionData.length; i++) {
        columnGraphArray.push(<DailyColumnChart data={this.state.dailyQuestionData[i]} key={i} index={i} />);
      }
    }
    return columnGraphArray;
  },

  buildGenreGraph() {
    let genreGraph = '';
    if (this.state.genreData) {
      genreGraph = (<GenreChart data={this.state.genreData} />);
    }
    return genreGraph;
  },

  render() {

    const columnGraphArray = this.buildDailyGraphs();
    const genreGraph = this.buildGenreGraph();
    
    return (
      <div className="directorHome">
        <Link to='/director/todaysQuiz'> Todays Quiz </Link>
        <Link to='/director/results'> Group Stats </Link>
        <Link to='/director/settings'> Settings </Link>
        {columnGraphArray}
        {genreGraph}
      </div>
    );
  },
});

module.exports = DirectorHome;

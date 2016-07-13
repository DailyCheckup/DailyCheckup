const React = require('react');
import { Link } from 'react-router';
const drawPieChart = require('./../Graphs/pieChart.js');
const drawColumnChart = require('./../Graphs/columnChart.js');
const AJAX = require('./AJAX.js');
google.charts.load('current', {'packages':['corechart', 'bar']});

const DirectorHome = React.createClass({

  getInitialState() {
    return ({
      userResponses: [],
    });
  },

  componentDidMount() {
    console.log('inside component did mount');
    console.log('state ', this.props.getState);
    const postObj = {
      isAdmin: this.props.getState.isAdmin,
      email: this.props.getState.userEmail,
      takenQuiz: this.props.getState.takenQuiz,
    };
    console.log('post obj ', postObj);
    AJAX.postRequest('http://localhost:3000/results', postObj, this.printData, this.error);
    // add more charts with more set on load callback functions
    google.charts.setOnLoadCallback(drawPieChart.drawChart);
    //google.charts.setOnLoadCallback(drawColumnChart.drawChart);
  },

  error() {
    console.log('Error!!! with the post request');
  },

  printData(responseData) {
    console.log('response data ', responseData);
  },

  render() {
    return (
      <div className="directorHome">
        <Link to='/director/todaysQuiz'> Todays Quiz </Link>
        <Link to='/director/results'> Group Stats </Link>
        <Link to='/director/settings'> Settings </Link>
        <div id="chart_div"></div>
        <div id="colChart_div"></div>
      </div>
    );
  },
});

module.exports = DirectorHome;

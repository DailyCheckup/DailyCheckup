const React = require('react');
import { Link } from 'react-router';
//const drawPieChart = require('./../Graphs/pieChart.js');
const drawColumnChart = require('./../Graphs/columnChart.js');
const AJAX = require('./AJAX.js');
const DailyColumnChart = require('./../Graphs/DailyColumnChart.jsx');
//google.charts.load('current', {'packages':['corechart', 'bar']});

const DirectorHome = React.createClass({

  getInitialState() {
    return ({
      dailyQuestionData: [],
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
    AJAX.postRequest('http://localhost:3000/results', postObj, this.printData, this.error);
    // add more charts with more set on load callback functions
    //google.charts.setOnLoadCallback(drawPieChart.drawChart);
  },

  error() {
    console.log('Error!!! with the post request');
  },

  printData(responseData) {
    const dailyData = JSON.parse(responseData);
    this.setState({dailyQuestionData: dailyData});

    // google.charts.setOnLoadCallback(drawColumnChart.drawChart(dailyData[0], 0));
    // google.charts.setOnLoadCallback(drawColumnChart.drawChart(dailyData[1], 1));
    // google.charts.setOnLoadCallback(drawColumnChart.drawChart(dailyData[2], 2));
    // google.charts.setOnLoadCallback(drawColumnChart.drawChart(dailyData[3], 3));
    // google.charts.setOnLoadCallback(drawColumnChart.drawChart(dailyData[4], 4));
    console.log('response data ', responseData);
  },

  render() {
    var columnGraphArray = [];
    if (this.state.dailyQuestionData.length === 0) {
      columnGraphArray = (<p>Loading...</p>);
    } else {
      for (var i = 0; i < this.state.dailyQuestionData.length; i++) {
        columnGraphArray.push(<DailyColumnChart data={this.state.dailyQuestionData[i]} key={i} index={i} />);
      }
    }

    const style = {width: '400px', height: '300px'};

    return (
      <div className="directorHome">
        <Link to='/director/todaysQuiz'> Todays Quiz </Link>
        <Link to='/director/results'> Group Stats </Link>
        <Link to='/director/settings'> Settings </Link>
        {columnGraphArray}
      </div>
    );
  },
});

module.exports = DirectorHome;

const React = require('react');
const drawColumnChart = require('./../Graphs/columnChart.js');
google.charts.load('current', {'packages':['corechart', 'bar']});

const DailyColumnChart = React.createClass({

  componentDidMount() {
    google.charts.setOnLoadCallback(drawColumnChart.drawChart(this.props.data, this.props.index));
  },

  determineQuestionDifficulty() {
    const percentCorrect = this.props.data.num_of_people_correct / (this.props.data.num_of_people_correct + this.props.data.num_of_people_incorrect);
    if (percentCorrect >= 0.8) {
      return (<div>Difficulty: Easy</div>);
    }
    if (percentCorrect >= 0.5) {
      return (<div>Difficulty: Medium</div>);
    }
    if (percentCorrect >= 0) {
      return (<div>Difficulty: Hard</div>);
    }
  },

  render() {

    const questionDifficulty = this.determineQuestionDifficulty();

    return(
      <div>
        <h2>Question {this.props.index + 1}</h2>
        <h3>{questionDifficulty} {100 * (this.props.data.num_of_people_correct / (this.props.data.num_of_people_correct + this.props.data.num_of_people_incorrect))}% Responded Correctly</h3>
        <p>{this.props.data.question}</p>
        <p>{this.props.data.a_option}</p>
        <p>{this.props.data.b_option}</p>
        <p>{this.props.data.c_option}</p>
        <p>{this.props.data.d_option}</p>
        <p>{this.props.data.e_option}</p>
        <div id={'colChart_div' + this.props.index}></div>
      </div>
    );
  },
});

module.exports = DailyColumnChart;

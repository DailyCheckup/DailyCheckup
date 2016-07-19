const React = require('react');
const drawListTable = require('./../Graphs/listTable.js');

const QuizTakenList = React.createClass({

  componentDidMount() {
    google.charts.setOnLoadCallback(drawListTable.drawTable('quizTaken', this.props.data, 'quizTakenTable'));
  },

  render() {
    return (
      <div id="quizTakenContainer">
        <h2>Taken Todays Quiz</h2>
        <div id="quizTakenTable"></div>
      </div>
    );
  }
});

module.exports = QuizTakenList;

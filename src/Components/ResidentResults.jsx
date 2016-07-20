const React = require('react');
const AJAX = require('./AJAX.js');
const DailyColumnChart = require('./../Graphs/DailyColumnChart.jsx');

const ResidentResults = React.createClass({

  componentDidMount() {
    const postObj = {
      isAdmin: this.props.getState.isAdmin,
      email: this.props.getState.userEmail,
      takenQuiz: this.props.getState.takenQuiz,
    };
    console.log('post obj ', postObj);
    AJAX.postRequest('/residentResults', postObj, this.printData, this.error);
  },

  error() {
    throw new Error('Post request error');
  },

  printData(results) {
    const dailyData = JSON.parse(results);
    this.props.setResidentState({
      dailyQuestionData: dailyData.todaysResults,
    });
  },

  buildDailyGraphs() {
    let columnGraphArray = [];
    const todaysQuestions = this.props.residentState.dailyQuestionData;
    if (todaysQuestions.length === 0) {
      columnGraphArray = (<p>Loading...</p>);
    } else if (typeof todaysQuestions === 'string') {
      columnGraphArray = (<p>No quizzes have been submitted today.</p>);
    } else {
      for (let i = 0; i < todaysQuestions.length; i++) {
        columnGraphArray.push(<DailyColumnChart data={todaysQuestions[i]} key={i} index={i} />);
      }
    }
    return columnGraphArray;
  },

  render() {

    const dailyGraphs = this.buildDailyGraphs();

    return (
      <div>
        <h1>Quiz Stats</h1>
        <h2>All Responses to Todays Quiz</h2>
        {dailyGraphs}
      </div>
    );
  },
});

module.exports = ResidentResults;

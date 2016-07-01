const React = require('react');
const Question = require('./Question.jsx');
// const Answer = require('./Answer.jsx');
const Timer = require('./Timer.jsx');
const Count = require('./Count.jsx');
// expecting an object that contains 3 arrays, each containing all
// the question data needed. (question,answers, correct answer, reasons)
// expecting prop to be named dailyQuestions

const Quiz = React.createClass({
  getInitialState() {
    return ({
      dailyQuestions: {
        1: ['1'],
        2: ['2'],
        3: ['3'],
      },
    });
  },
  render() {
    return (
      <div>
        <Count
          numberOfQuesiton={Object.keys(this.state.dailyQuestions).length}
        />
        <Timer />
        <Question
          question={this.state.dailyQuestions[1]}
        />
        <submit />
      </div>
     );
  },
});

module.exports = Quiz;

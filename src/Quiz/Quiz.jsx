const React = require('react');
const Question = require('./Question.jsx');
const Answer = require('./Answer.jsx');
const Timer = require('./Timer.jsx');

const Quiz = React.createClass({
  render() {
    return (
      <div>
        <Question />
        <Answer />
        <Timer />
      </div>
     );
  },
});

module.exports = Quiz;

const React = require('react');
import { Link } from 'react-router';

const DirectorTodaysQuiz = React.createClass({

  buildAnswers(obj) {
    const answersArray = [];
    const selections = ['a', 'b', 'c', 'd', 'e'];
    selections.forEach(function (letter) {
      if (obj[letter] !== 'null') {
        answersArray.push(<p>{obj[letter]}</p>);
      }
    });
    return answersArray;
  },

  parseDailyQuestions() {
    const questionArray = [];
    const dailyQuestions = this.props.getState.dailyQuestions;

    for (let i = 0; i < dailyQuestions.length; i++) {
      questionArray.push(
        <div className="questionInfo">
          <h3>Question {i + 1}</h3>
          <p>{dailyQuestions[i].question}</p>
          {this.buildAnswers(dailyQuestions[i])}
          <p>Answer: {dailyQuestions[i].answer}</p>
          <p>Reason: {dailyQuestions[i].reason}</p>
        </div>
      );
    }
    return questionArray;
  },

  render() {
    const quizQuestions = this.parseDailyQuestions();

    return (
      <div className="todaysQuiz">
        <h2>Today's Quiz</h2>
        {quizQuestions}
        <Link to="/director/"><button> Home </button></Link>
      </div>
    );
  },
});

module.exports = DirectorTodaysQuiz;

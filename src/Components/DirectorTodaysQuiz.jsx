const React = require('react');
import { Link } from 'react-router';

const DirectorTodaysQuiz = React.createClass({

  parseDailyQuestions() {
    const questionArray = [];
    const dailyQuestions = this.props.getState.dailyQuestions;

    for (let i = 0; i < dailyQuestions.length; i++) {
      const answerE = (<p>{dailyQuestions[i].e}</p>);
      questionArray.push(
        <div className="questionInfo">
          <h3>Question {i + 1}</h3>
          <p>{dailyQuestions[i].question}</p>
          <p>{dailyQuestions[i].a}</p>
          <p>{dailyQuestions[i].b}</p>
          <p>{dailyQuestions[i].c}</p>
          <p>{dailyQuestions[i].d}</p>
          {dailyQuestions[i].e ? '' : answerE}
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
        <button> <Link to="/director/"> Home </Link> </button>
      </div>
    );
  },
});

module.exports = DirectorTodaysQuiz;

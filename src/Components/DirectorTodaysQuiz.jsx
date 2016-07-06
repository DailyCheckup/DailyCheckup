const React = require('react');

const DirectorTodaysQuiz = React.createClass({

  parseDailyQuestions() {
    const questionArray = [];
    const dailyQuestions = this.props.getState.dailyQuestions;
    for (let i = 0; i < dailyQuestions.length; i++) {
      questionArray.push(
        <div>
          <h3>Question {i + 1}</h3>
          <p>{dailyQuestions[i].question}</p> 
          <p>{dailyQuestions[i].a}</p>
          <p>{dailyQuestions[i].b}</p>
          <p>{dailyQuestions[i].c}</p>
          <p>{dailyQuestions[i].d}</p>
          <p>{dailyQuestions[i].e}</p>
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
      <div>
        <h1>Todays Quiz</h1>
        {quizQuestions}
      </div>
    );
  },
});

module.exports = DirectorTodaysQuiz;

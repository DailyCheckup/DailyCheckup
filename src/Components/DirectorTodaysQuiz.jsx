const React = require('react');

const DirectorTodaysQuiz = React.createClass({

  parseDailyQuestions() {
    const dailyQuestions = 
    [{question: 'Hi??1',
      a: 'yoyoyo',
      b: 'yayayayay',
      c: 'yepyepyep',
      d: 'mmmhmmmmm',
      e: 'maybeeee',
      answer: '42',
      reason: 'cuz',},
      {question: 'Hi??2',
      a: 'yoyoyo',
      b: 'yayayayay',
      c: 'yepyepyep',
      d: 'mmmhmmmmm',
      e: 'maybeeee',
      answer: 'copy pasta',
      reason: 'reasons',},
      {question: 'Hiii3',
      a: 'yoyoyo',
      b: 'yayayayay',
      c: 'yepyepyep',
      d: 'mmmhmmmmm',
      e: 'null',
      answer: 'pizza',
      reason: 'thingz',}];
    const questionArray = [];
    //const dailyQuestions = this.props.getState.dailyQuestions;
    for (let i = 0; i < dailyQuestions.length; i++) {
      questionArray.push(
        <div>
          <h3>Question {i + 1}. {dailyQuestions[i].question}</h3>
          <p>A. {dailyQuestions[i].a}</p>
          <p>B. {dailyQuestions[i].b}</p>
          <p>C. {dailyQuestions[i].c}</p>
          <p>D. {dailyQuestions[i].d}</p>
          <p>E. {dailyQuestions[i].e}</p>
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
        <h1>Director Todays Quiz!</h1>
        {quizQuestions}
      </div>
    );
  },
});

module.exports = DirectorTodaysQuiz;

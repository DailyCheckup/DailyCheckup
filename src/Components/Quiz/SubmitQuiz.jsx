const React = require('react');

const SubmitQuiz = React.createClass({
  propTypes: {
    submitQuiz: React.PropTypes.func,
    nextQuestion: React.PropTypes.func,
    isSubmit: React.PropTypes.bool,
  },
  // display a button either to run a click handler to go to the next questions
  // or to submit the quiz to the server
  render() {
    const submitQuiz = <button onClick={this.props.submitQuiz}> Submit Quiz </button>;
    const nextQuestion = <button onClick={this.props.nextQuestion}> Submit </button>;
    const display = this.props.isSubmit ? submitQuiz : nextQuestion;

    return (
      <div>
        {display}
      </div>
      );
  },

});

module.exports = SubmitQuiz;

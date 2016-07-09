const React = require('react');

const SubmitQuiz = React.createClass({
  propTypes: {
    submitQuiz: React.PropTypes.func,
    nextQuestion: React.PropTypes.func,
    isSubmit: React.PropTypes.bool,
  },
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

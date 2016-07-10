const React = require('react');


const Answers = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    currentQuestion: React.PropTypes.object,
    updateAnswer: React.PropTypes.func,
  },
  render() {
    return (
      <div>
        <input
          type="radio"
          name="options"
          id={this.props.id}
          value={this.props.currentQuestion[this.props.id][0]}
          onChange={this.props.updateAnswer}
        ></input>
        <label htmlFor="a"> {this.props.currentQuestion[this.props.id]} </label> <br />
      </div>
    );
  },
});

module.exports = Answers;

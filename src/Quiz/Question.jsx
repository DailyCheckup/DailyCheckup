const React = require('react');

const Question = React.createClass({
  propTypes: {
    question: React.PropTypes.array.isRequired,
  },
  render() {
    return (
      <div>
        {this.props.question[0]}
      </div>
     );
  },
});

module.exports = Question;

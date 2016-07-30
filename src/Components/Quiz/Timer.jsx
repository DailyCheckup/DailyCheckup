const React = require('react');


const Timer = React.createClass({
  propTypes: {
    seconds: React.PropTypes.number,
  },
  // takes prop of time in seconds and converts it to minutes and seconds and
  // displays it in a p tag
  render() {
    let seconds = this.props.seconds % 60;
    let minutes = Math.floor(this.props.seconds / 60);
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return (<p id="timeCountdown">Timer: {minutes}:{seconds} </p>);
  },
});

module.exports = Timer;

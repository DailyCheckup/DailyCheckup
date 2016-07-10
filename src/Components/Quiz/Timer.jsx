const React = require('react');


const Timer = React.createClass({
  propTypes: {
    seconds: React.PropTypes.number,
  },
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

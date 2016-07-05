const React = require('react');
import { Link } from 'react-router';

const ResidentHome = React.createClass({
  render() {
    return (
      <div>
        <button id="quizBtn"><Link to='/resident/quiz'> Start Quiz! </Link></button>
        <button id="residentResultsBtn"><Link to='/resident/results'> Check your Results </Link></button>
        <button id="changePWBtn"><Link to='/resident/changePassword'> Change password </Link></button>
      </div>
    );
  },
});

module.exports = ResidentHome;

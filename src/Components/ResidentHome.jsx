const React = require('react');
import { Link } from 'react-router';

const ResidentHome = React.createClass({
  render() {
    return (
      <div className="residentHome">
        <Link to='/resident/quiz'> Start Quiz! </Link>
        <Link to='/resident/results'> Check your Results </Link>
        <Link to='/resident/changePassword'> Change password </Link>
      </div>
    );
  },
});

module.exports = ResidentHome;

const React = require('react');
import { Link } from 'react-router';

const ResidentHome = React.createClass({
  render() {
    return (
      <div>
        <p>Resident Home</p>
        <button><Link to='/resident/quiz'> Start Quiz! </Link></button>
        <button><Link to='/resident/results'> Check your Results </Link></button>
        <button><Link to='/resident/changePassword'> Change password </Link></button>
      </div>
    );
  },
});

module.exports = ResidentHome;

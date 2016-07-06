const React = require('react');
import { Link } from 'react-router';

const ResidentHome = React.createClass({
  render() {
    return (
      <div className="residentHome">
        <Link to='/resident/quiz'> Take the Quiz! </Link>
        <Link to='/resident/results'> Check your Stats </Link>
        <Link to='/resident/changePassword' id="changePW"> Change password </Link>
      </div>
    );
  },
});

module.exports = ResidentHome;

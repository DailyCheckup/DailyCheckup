const React = require('react');
import { Link } from 'react-router';

const DirectorHome = React.createClass({
  render() {
    return (
      <div className="directorHome">
        <Link to='/director/todaysQuiz'> Todays Quiz </Link>
        <Link to='/director/results'> Group Stats </Link>
        <Link to='/director/settings'> Settings </Link>
      </div>
    );
  },
});

module.exports = DirectorHome;

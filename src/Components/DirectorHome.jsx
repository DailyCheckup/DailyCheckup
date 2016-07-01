const React = require('react');
import { Link } from 'react-router';

const DirectorHome = React.createClass({
  render() {
    return (
      <div>
        <button><Link to='/todaysQuiz'> Todays Quiz! </Link></button>
        <button><Link to='/director/results'> Group Results </Link></button>
      </div>
    );
  },
});

module.exports = DirectorHome;

const React = require('react');
import { Link } from 'react-router';

const ResidentHome = React.createClass({
  render() {
    return (
      <div>
        <button><Link to='/quiz'> Start Quiz! </Link></button>
        <button><Link to='/resident/results'> Check your Results </Link></button>
      </div>
    );
  },
});

module.exports = ResidentHome;

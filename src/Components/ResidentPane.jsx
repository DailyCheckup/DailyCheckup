const React = require('react');
import { Link } from 'react-router';

const ResidentPane = React.createClass({
  render() {
    return (
      <div>
        <p>Hi Brendan!</p>
        <Link to='resident/home'> Director Home </Link>
        {this.props.children}
      </div>
    );
  },
});

module.exports = ResidentPane;

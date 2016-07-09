const React = require('react');
import { Link } from 'react-router';

const Header = React.createClass({
  render() {

    const headerLink = this.props.getState.isAdmin ? <Link to='/director/'>Daily Checkup</Link> : <Link to='/resident/'>Daily Checkup</Link>;

    return (
      <header>
        <h1>{headerLink}</h1>
        {this.props.children}
      </header>
    );
  },
});

module.exports = Header;

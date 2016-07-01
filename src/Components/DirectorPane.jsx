const React = require('react');
import { Link } from 'react-router';

const DirectorPane = React.createClass({
  render() {
    return (
      <div>
        <h1>Director Pane - Welcome Director!</h1>
        <Link to='/director/'> Director Pane - Director Home </Link>
        {this.props.children}
      </div>
    );
  },
});

module.exports = DirectorPane;

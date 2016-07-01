const React = require('react');
import { Link } from 'react-router';

const ResidentPane = React.createClass({
  render() {
    return (
      <div>
        <p>Hi Brendan! - Resident Pane</p>
        <Link to='/resident/'> Resident Pane - Resident Home Btn</Link>
        {this.props.children}
      </div>
    );
  },
});

module.exports = ResidentPane;

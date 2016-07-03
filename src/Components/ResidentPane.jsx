const React = require('react');
import { Link } from 'react-router';

const ResidentPane = React.createClass({
  render() {
    return (
      <div>
        <p>Hi Brendan! - Resident Pane</p>
        <Link to='/resident/'> Resident Pane - Resident Home Btn</Link>
        {this.props.children && React.cloneElement(this.props.children,
          { setAppState: this.props.setAppState, getState: this.props.getState })}
      </div>
    );
  },
});

module.exports = ResidentPane;

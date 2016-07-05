const React = require('react');
import { Link } from 'react-router';

const ResidentPane = React.createClass({
  render() {
    return (
      <div className='residentPane'>
        <p>Hi {this.props.getState.firstName}!
          <Link className='homeIcon' to='/resident/'>
            <i className='material-icons md-36 md-dark'>
            home
            </i>
          </Link>
        </p>
        {this.props.children && React.cloneElement(this.props.children,
          { setAppState: this.props.setAppState, getState: this.props.getState })}
      </div>
    );
  },
});

module.exports = ResidentPane;

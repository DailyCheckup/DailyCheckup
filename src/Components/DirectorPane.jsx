const React = require('react');
import { Link } from 'react-router';

const DirectorPane = React.createClass({
  render() {
    return (
      <div className="directorPane">
        <p id="userFirstName">Hi {this.props.getState.firstName}!
          <Link className='homeIcon' to='/director/'>
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

module.exports = DirectorPane;

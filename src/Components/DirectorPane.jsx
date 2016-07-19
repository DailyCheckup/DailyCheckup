const React = require('react');
const jwtDecode = require('jwt-decode');
import { Link } from 'react-router';

const DirectorPane = React.createClass({
  componentWillMount() {
    // check to see if there is state in app
    if (this.props.getState.firstName === '') {
      const token = jwtDecode(localStorage.DailyCheckupToken);
      this.props.setAppState(token);
    }
  },

  render() {
    return (
      <div className="directorPane md-width-70 lg-width-30">
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

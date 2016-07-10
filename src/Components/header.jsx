const React = require('react');
import { Link } from 'react-router';

const Header = React.createClass({

  clearState() {
    const newStateObj = {
      userEmail: '',
      firstName: '',
      changedPW: '',
      isAdmin: '',
      dailyQuestions: [],
      takenQuiz: false,
      quizAvailability: false,
      confirmPasswordError: false,
      successfulPasswordChange: false,
      samePasswordError: false,
      loggedIn: false,
    };
    this.props.setAppState(newStateObj);
  },

  render() {

    const headerLink = this.props.getState.isAdmin ? 
      <Link to='/director/'>Daily Checkup</Link> : 
      <Link to='/resident/'>Daily Checkup</Link>;
    const logoutButton = this.props.getState.loggedIn ?
      <button id="logout" onClick={this.clearState}><Link to='/'> Logout </Link></button> :
      '';

    return (
      <header>
        <h1>{headerLink}</h1>
        {logoutButton}
        {this.props.children}
      </header>
    );
  },
});

module.exports = Header;

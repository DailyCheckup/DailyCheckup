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
    delete localStorage.DailyCheckupToken;
    this.props.setAppState(newStateObj);
  },

  render() {

    const headerLink = this.props.getState.isAdmin ?
      <Link to='/director/'>Daily Checkup</Link> :
      <Link to='/resident/'>Daily Checkup</Link>;
    const logoutButton = localStorage.DailyCheckupToken ?
      <Link to='/'><button id="logout" onClick={this.clearState}> Logout </button></Link>:
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

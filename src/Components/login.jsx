const React = require('react');
const AJAX = require('./AJAX.js');
import { browserHistory } from 'react-router';
import store from './../store';
const loginActions = require('./../actions/loginActions.js');

const Login = React.createClass({

  submitForm(e) {
    e.preventDefault();
    console.log('inside submit form onclick');
    const email = this.inputEmail.value;
    const lowerEmail = email.toLowerCase();
    const pw = this.inputPassword.value;
    const pwAndEmailObj = {
      emailAddress: lowerEmail,
      password: pw,
    };
    AJAX.postRequest('/login', pwAndEmailObj, this.parseDataAndSetState, this.displayError);
  },

  redirectToUsersPane(isAdmin) {
    if (isAdmin) {
      browserHistory.push('/director/');
    } else {
      browserHistory.push('/resident/');
    }
  },

  parseDataAndSetState(responseData) {
    const response = JSON.parse(responseData);
    const newStateObj = {
      userEmail: response.email,
      changedPW: response.changedPassword,
      isAdmin: response.isAdmin,
      dailyQuestions: response.dailyQuestions,
      takenQuiz: response.takenQuiz,
      quizAvailability: response.quizAvailability,
      firstName: response.firstName,
      loggedIn: true,
    };
    localStorage.DailyCheckupToken = response.token;
    const loginSuccessAction = loginActions.loginSuccess(newStateObj);
    store.dispatch(loginSuccessAction);
    // this.props.setAppState(newStateObj);
    this.redirectToUsersPane(response.isAdmin);
  },

  displayError() {
    document.getElementById('loginError').style.display = '';
  },

  render() {
    return (
      <div className="loginContainer md-width-55 lg-width-40">
        <h2>Login</h2>
        <div id="loginError" style={{ display: 'none' }}>
          Incorrect email address or password.
        </div>
        <form className="clearfix">
          <div className="emailLogin">
            <label>Email Address</label>
            <input ref={(ref) => this.inputEmail = ref} type="email" placeholder="JohnDoe@example.com" />
          </div>

          <div className="passwordLogin">
            <label>Password</label>
            <input ref={(ref) => this.inputPassword = ref} type="password" placeholder="Password" />
          </div>

          <button className="signInBtn" onClick={this.submitForm}>Sign In</button>
        </form>
      </div>
    );
  },
});

module.exports = Login;

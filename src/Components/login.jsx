const React = require('react');
const ReactDOM = require('react-dom');
const AJAX = require('./AJAX.js');
import { Link, browserHistory } from 'react-router';

// TODO
// 2. Fill in route url
// 3. Session

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
    //localStorage.token = Math.random.toString(36).substring(7);
    console.log('response in parse ', response);
    const userEmail = response.email;
    const changedPW = response.changedPassword;
    const isAdmin = response.isAdmin;
    const dailyQuestions = response.dailyQuestions;
    const takenQuiz = response.takenQuiz;
    const quizAvailability = response.quizAvailability;
    const firstName = response.firstName;
    const loggedIn = true;
    const newStateObj = {
      userEmail,
      changedPW,
      isAdmin,
      dailyQuestions,
      takenQuiz,
      quizAvailability,
      firstName,
      loggedIn,
    };
    this.props.setAppState(newStateObj);
    this.redirectToUsersPane(isAdmin);
  },

  displayError() {
    document.getElementById('loginError').style.display = '';
  },

  render() {
    return (
      <div className="loginContainer md-width-70 md-margin-top lg-width-30 lg-margin-top">
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

const React = require('react');
const ReactDOM = require('react-dom');
import { Link, browserHistory } from 'react-router';

// TODO
// 1. Make labels invisible but don't use 'display: none'
// 2. Fill in route url
// 3. Session
// 4. Logic for first login

const Login = React.createClass({

  submitForm(e) {
    e.preventDefault();
    console.log('inside submit form onclick');
    const email = ReactDOM.findDOMNode(this.refs.emailAddress).value;
    const pw = ReactDOM.findDOMNode(this.refs.password).value;
    const pwAndEmailObj = {
      emailAddress: email,
      password: pw,
    };
    const url = 'http://localhost:3000/login'; // UPDATE WITH ROUTE
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(pwAndEmailObj));
    xhr.onreadystatechange = function () {
      this.processResponse(xhr);
    }.bind(this);
  },

  processResponse(xhr) {
    // If request is done
    if (xhr.readyState === 4) {
      console.log('readystate is 4');
      // And status is OK
      if (xhr.status === 200) {
        console.log('status is 200');
        this.parseDataAndSetState(xhr.responseText);
      } else {
        // If error, email or password was incorrect so display error
        console.log('Error: ' + xhr.status);
        this.displayError();
      }
    }
  },

  redirectToUsersPane(isAdmin) {
    if (isAdmin) {
      browserHistory.push('/director/');
    } else {
      browserHistory.push('/resident');
    }
  },

  // Seems uncessesary, when you can redirect before setting state

  // componentWillReceiveProps(newprops) {
  //   if (newprops.getState.isAdmin === false) {
  //     console.log('isAdmin is false');
  //     browserHistory.push('/resident/');
  //   }
  //   // Route to director pane
  //   if (newprops.getState.isAdmin) {
  //     console.log('isAdmin is true');
  //     browserHistory.push('/director/');
  //   }
  // },

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
    const newStateObj = {
      userEmail,
      changedPW,
      isAdmin,
      dailyQuestions,
      takenQuiz,
      quizAvailability,
      firstName,
    };
    this.redirectToUsersPane(isAdmin);
    this.props.setAppState(newStateObj);
  },

  displayError() {
    document.getElementById('loginError').style.display = '';
  },

  render() {
    return (
      <div className="loginContainer">
        <h2>Login</h2>
        <div id="loginError" style={{ display: 'none' }}>
          Incorrect email address or password.
        </div>
        <form className="clearfix">
          <div className="emailLogin">
            <label>Email Address</label>
            <input ref="emailAddress" type="email" placeholder="JonDoe@example.com" />
          </div>

          <div className="passwordLogin">
            <label>Password</label>
            <input ref="password" type="password" placeholder="Password" />
          </div>

          <button className="signInBtn" onClick={this.submitForm}>Sign In</button>
        </form>
      </div>
    );
  },
});

module.exports = Login;

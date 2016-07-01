const React = require('react');
const ReactDOM = require('react-dom');

// TODO
// 1. Make labels invisible but don't use 'display: none'
// 2. Fill in route url
// 3. Session
// 4. Logic for first login
// 5. Logic for routing
// 6: Error message if incorrect email or password

const Login = React.createClass({

  submitForm() {
    console.log('inside submit form onclick');
    const email = ReactDOM.findDOMNode(this.refs.emailAddress).value;
    const pw = ReactDOM.findDOMNode(this.refs.password).value;
    const pwAndEmailObj = {
      emailAddress: email,
      password: pw,
    };
    const url = 'PLACEHOLDER'; //UPDATE WITH ROUTE
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.send(pwAndEmailObj);
    xhr.onreadystatechange = this.processResponse();
  },

  processResponse() {
    // If request is done
    if (xhr.readyState = 4) {
      // And status is OK
      if (xhr.status = 200) {
        console.log(xhr.responseText);
        // If first login, prompt to change password
        // If correct route to their home page
        // Add session?
      } else {
        console.log('Error: ' + xhr.status);
        // If error is a certain status code, render error message
      }
    }
  },

  render() {
    return (
      <div className="loginContainer">
        <form>
          <div className="emailLogin">
            <label>Email Address</label>
            <input ref="emailAddress" type="email" placeholder="Enter your email " />
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

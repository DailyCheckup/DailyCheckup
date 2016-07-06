const React = require('react');
const ReactDOM = require('react-dom');

const ResidentChangePW = React.createClass({

  submitPassword(e) {
    console.log('inside submit pw');
    e.preventDefault();

    // Clear old error messages
    document.getElementById('confirmPasswordError').style.display = 'none';
    document.getElementById('samePasswordError').style.display = 'none';

    // Grab values out of form fields
    const oldPW = ReactDOM.findDOMNode(this.refs.oldPW).value;
    const newPW = ReactDOM.findDOMNode(this.refs.newPW).value;
    const confirmNewPW = ReactDOM.findDOMNode(this.refs.confirmNewPW).value;

    // Check for errors in password fields
    this.checkPasswordFieldsMatch(newPW, confirmNewPW, oldPW);
  },

  checkPasswordFieldsMatch(newPW, confirmNewPW, oldPW) {
    console.log('inside check passwords');
    // New password and confirm password do not match
    if (newPW !== confirmNewPW) {
      ReactDOM.findDOMNode(this.refs.newPW).value = '';
      ReactDOM.findDOMNode(this.refs.confirmNewPW).value = '';
      this.displayConfirmPasswordError();

      // If they do match, make sure the new pw isn't the same as the old pw
    } else if (this.checkNewPasswordIsOldPW(newPW, oldPW)) {
      console.log('old pass = new pass');
      this.displaySamePasswordError();

      // Old pw !== new pw and new pw = confirm pw so send to db
    } else {
      this.sendNewPasswordToDB(newPW);
    }
  },

  checkNewPasswordIsOldPW(newPW, oldPW) {
    console.log('new pw = old pw');
    if (newPW === oldPW) {
      ReactDOM.findDOMNode(this.refs.newPW).value = '';
      ReactDOM.findDOMNode(this.refs.confirmNewPW).value = '';
      ReactDOM.findDOMNode(this.refs.oldPW).value = '';
      return true;
    }
    return false;
  },

  displayConfirmPasswordError() {
    document.getElementById('confirmPasswordError').style.display = '';
  },

  displaySuccessMessage() {
    document.getElementById('successfulPasswordChange').style.display = '';
  },

  displaySamePasswordError() {
    document.getElementById('samePasswordError').style.display = '';
  },

  sendNewPasswordToDB(newPW) {
    console.log('sending new password to db');
    const userEmail = this.props.getState.userEmail;
    const pw = newPW;
    const pwAndEmailObj = {
      emailAddress: userEmail,
      newPassword: pw,
    };
    const url = 'http://localhost:3000/changePassword'; // UPDATE WITH ROUTE
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(pwAndEmailObj));
    xhr.onreadystatechange = function () {
      this.processResponse(xhr);
    }.bind(this);
  },

  processResponse(xhr) {
    console.log('in process response');
    console.log(xhr.readyState);
    // If request is done
    if (xhr.readyState === 4) {
      console.log('readystate is 4');
      // And status is OK
      if (xhr.status === 200) {
        console.log('status is 200');
        this.displaySuccessMessage();
      } else {
        // If error, email or password was incorrect so display error
        console.log('Error: ' + xhr.status);
        console.log('some type of server error - yikes!!');
      }
    }
  },

  render() {
    return (
      <div className="changePassword">
        <h2>Change Password</h2>
        <p>*All fields are case sensitive</p>
        <form>
          <div id="confirmPasswordError" style={{ display: 'none' }}>
            The new password and confirm password fields did not match. Please reenter your new password.
          </div>
          <div id="successfulPasswordChange" style={{ display: 'none' }}>
            You have succesfully updated your password!
          </div>
          <div id="samePasswordError" style={{ display: 'none' }}>
            The current password and new passwords are the same. Please enter a new password.
          </div>
          <label>Current Password</label>
          <input ref='oldPW' type='password' />
          <label>New Password</label>
          <input ref='newPW' type='password' />
          <label>Confirm New Password</label>
          <input ref='confirmNewPW' type='password' />
          <button onClick={this.submitPassword}>Submit</button>
        </form>
      </div>
    );
  },
});

module.exports = ResidentChangePW;

const React = require('react');
const AJAX = require('./AJAX.js');
import store from './../store.js';

const ResidentChangePW = React.createClass({

  submitPassword(e) {
    console.log('inside submit pw');
    e.preventDefault();

    // Grab values out of form fields
    const oldPW = this.inputOldPW.value;
    const newPW = this.inputNewPW.value;
    const confirmNewPW = this.inputConfirmPW.value;

    // Check for errors in password fields
    this.checkPasswordFieldsMatch(newPW, confirmNewPW, oldPW);
  },

  checkPasswordFieldsMatch(newPW, confirmNewPW, oldPW) {
    console.log('inside check passwords');
    // New password and confirm password do not match
    if (newPW !== confirmNewPW) {
      this.inputNewPW.value = '';
      this.inputConfirmPW.value = '';
      this.props.setAppState({
        confirmPasswordError: true,
        successfulPasswordChange: false,
        samePasswordError: false,
      });

      // If they do match, make sure the new pw isn't the same as the old pw
    } else if (this.checkNewPasswordIsOldPW(newPW, oldPW)) {
      this.props.setAppState({
        confirmPasswordError: false,
        successfulPasswordChange: false,
        samePasswordError: true,
      });

      // Old pw !== new pw and new pw = confirm pw so send to db
    } else {
      this.sendNewPasswordToDB(newPW);
    }
  },

  checkNewPasswordIsOldPW(newPW, oldPW) {
    if (newPW === oldPW) {
      this.inputNewPW.value = '';
      this.inputConfirmPW.value = '';
      this.inputOldPW.value = '';
      return true;
    }
    return false;
  },

  sendNewPasswordToDB(newPW) {
    console.log('sending new password to db');
    // const userEmail = this.props.getState.userEmail;
    const userEmail = store.getState().userState.userEmail;
    const pw = newPW;
    const pwAndEmailObj = {
      emailAddress: userEmail,
      newPassword: pw,
    };
    const url = '/changePassword'; // UPDATE WITH ROUTE
    AJAX.postRequest(url, pwAndEmailObj, this.successfulChange.bind(this), this.postError);
  },

  successfulChange(response) {
    // Clear all input fields
    this.inputNewPW.value = '';
    this.inputConfirmPW.value = '';
    this.inputOldPW.value = '';
    // Set state that the user has changed their password
    // Display success message
    this.props.setAppState({
      changedPW: true,
      confirmPasswordError: false,
      successfulPasswordChange: true,
      samePasswordError: false,
    });
  },

  postError() {
    // If error, email or password was incorrect so display error
    throw new Error('Post Request Error');
  },

  displayMessage() {
    if (this.props.getState.confirmPasswordError) {
      return (
        <div id="confirmPasswordError">
          The new password and confirm password fields did not match. Please reenter your new password.
        </div>
      );
    }
    if (this.props.getState.successfulPasswordChange) {
      return (
        <div id="successfulPasswordChange">
          You have succesfully updated your password!
        </div>
      );
    }
    if (this.props.getState.samePasswordError) {
      return (
        <div id="samePasswordError">
          The current password and new passwords are the same. Please enter a new password.
        </div>
      );
    }
    return '';
  },

  render() {

    const message = this.displayMessage();
    // console.log("insde the render function with the message equal to::", message);

    return (
      <div className="changePassword">
        <h2>Change Password</h2>
        <p>*All fields are case sensitive</p>
        <form>
          {message}
          <label>Current Password</label>
          <input ref={(ref) => this.inputOldPW = ref} type='password' />
          <label>New Password</label>
          <input ref={(ref) => this.inputNewPW = ref} type='password' />
          <label>Confirm New Password</label>
          <input ref={(ref) => this.inputConfirmPW = ref} type='password' />
          <button onClick={this.submitPassword}>Submit</button>
        </form>
      </div>
    );
  },
});

module.exports = ResidentChangePW;

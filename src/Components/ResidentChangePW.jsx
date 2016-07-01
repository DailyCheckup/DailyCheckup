const React = require('react');

const ResidentChangePW = React.createClass({
  render() {
    return (
      <div>
        <h1>Change your password here!</h1>
        <form>
          <label>Current Password</label>
          <input type='password' placeholder='Current password' />
          <label>New Password</label>
          <input type='password' placeholder='New password' />
          <label>Confirm New Password</label>
          <input type='password' placeholder='New password' />
          <button>Submit</button>
        </form>
      </div>
    );
  },
});

module.exports = ResidentChangePW;

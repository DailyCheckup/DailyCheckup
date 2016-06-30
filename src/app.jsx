const React = require('react');
const Login = require('./login.jsx');

const App = React.createClass({
  render() {
    return (
      <div id="container">
        Welcome to MD Quiz!
        <Login />
      </div>
    );
  },
});

module.exports = App;

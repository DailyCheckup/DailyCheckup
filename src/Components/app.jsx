const React = require('react');
//const Login = require('./login.jsx');
const Routes = require('./reactRoutes.jsx');

const App = React.createClass({
  render() {
    return (
      <div id="container">
        <Routes />
      </div>
    );
  },
});

module.exports = App;

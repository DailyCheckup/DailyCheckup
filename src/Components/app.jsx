const React = require('react');
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

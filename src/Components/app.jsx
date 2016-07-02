const React = require('react');
const Routes = require('./reactRoutes.jsx');

const App = React.createClass({

  getInitialState() {
    return {
      userEmail: '',
      changedPW: '',
      isAdmin: '',
      dailyQuestions: [],
    };
  },

  setAppState(stateObj) {
    this.setState(stateObj);
  },

  render() {
    return (
      <div id="container">
        <Routes getState={this.state} setAppState={this.setAppState} />
      </div>
    );
  },
});

module.exports = App;

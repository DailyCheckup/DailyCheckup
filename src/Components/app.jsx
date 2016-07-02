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
        {this.props.children && React.cloneElement(this.props.children,
          { setAppState: this.setAppState, getState: this.state })}
      </div>
    );
  },
});

module.exports = App;

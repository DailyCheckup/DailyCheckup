const React = require('react');
const Header = require('./header.jsx');
const App = React.createClass({

  getInitialState() {
    return {
      userEmail: '',
      changedPW: '',
      isAdmin: '',
      dailyQuestions: [],
      takenQuiz: false,
    };
  },

  setAppState(stateObj) {
    this.setState(stateObj);
  },

  render() {
    return (
      <div id="container">
        <Header />
        {this.props.children && React.cloneElement(this.props.children,
          { setAppState: this.setAppState, getState: this.state })}
      </div>
    );
  },
});

module.exports = App;

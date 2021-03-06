const React = require('react');
const Header = require('./header.jsx');
google.charts.load('current', {'packages':['corechart', 'bar', 'table']});

const App = React.createClass({

  getInitialState() {
    return {
      userEmail: '',
      firstName: '',
      changedPW: '',
      isAdmin: '',
      dailyQuestions: [],
      takenQuiz: false,
      quizAvailability: false,
      confirmPasswordError: false,
      successfulPasswordChange: false,
      samePasswordError: false,
      loggedIn: false,
    };
  },
  setAppState(stateObj) {
    this.setState(stateObj);
  },

  render() {
    return (
      <div>
        <Header getState={this.state} setAppState={this.setAppState}/>
        <div className="container">
          {this.props.children && React.cloneElement(this.props.children,
            { setAppState: this.setAppState, getState: this.state })}
        </div>
      </div>
    );
  },
});

module.exports = App;

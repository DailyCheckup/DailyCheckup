const React = require('react');
import { Link } from 'react-router';
import store from './../store.js';

const ResidentHome = React.createClass({

  createResultsButton() {
    let resultsButton = '';
    // if (this.props.getState.takenQuiz) {
    if (store.getState().userState.takenQuiz) {
      resultsButton = (<Link to='/resident/results'>Check Quiz Stats</Link>);
    } else {
      resultsButton = (<a className="inactiveBtn">Check Quiz Stats</a>);
    }
    return resultsButton;
  },

  tempPwMessage() {
    return (
      <p id="warning">
        <i className='material-icons'>warning</i>
         You have not yet changed your temporary password.
      </p>
    );
  },

  render() {
    const warningMessage = store.getState().userState.changedPW ? '' : this.tempPwMessage();
    const resultsButton = this.createResultsButton();

    return (
      <div className="residentHome clearfix">
        <Link to='/resident/quiz'> Take the Quiz! </Link>
        {resultsButton}
        <Link to='/resident/changePassword' id="changePW"> Change password </Link>
        {warningMessage}
      </div>
    );
  },
});

module.exports = ResidentHome;

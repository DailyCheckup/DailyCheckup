const React = require('react');
import { Link } from 'react-router';

const ResidentHome = React.createClass({

  createResultsButton() {
    let resultsButton = '';
    if (this.props.getState.takenQuiz) {
      resultsButton = (<Link to='/resident/results'>Check Quiz Stats</Link>);
    } else {
      resultsButton = (<a className="inactiveBtn">Check Quiz Stats</a>);
    }
    return resultsButton;
  },

  render() {
    const warningMessage = (<p id="warning" >
    <i className='material-icons'>warning</i>
         You have not yet changed your temporary password.
    </p>);
    const resultsButton = this.createResultsButton();

    return (
      <div className="residentHome clearfix">
        <Link to='/resident/quiz'> Take the Quiz! </Link>
        {resultsButton}
        <Link to='/resident/changePassword' id="changePW"> Change password </Link>
        {this.props.getState.changedPW ? '' : warningMessage}
      </div>
    );
  },
});

module.exports = ResidentHome;

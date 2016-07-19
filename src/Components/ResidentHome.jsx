const React = require('react');
import { Link } from 'react-router';

const ResidentHome = React.createClass({
  render() {
      const warningMessage = (<p id="warning" >
      <i className='material-icons'>warning</i>
           You have not yet changed your temporary password.
      </p>);
    return (
      <div className="residentHome clearfix">
        <Link to='/resident/quiz'> Take the Quiz! </Link>
        <Link to='/resident/results'> Check Quiz Stats </Link>
        <Link to='/resident/changePassword' id="changePW"> Change password </Link>
        {this.props.getState.changedPW ? '' : warningMessage}
      </div>
    );
  },
});

module.exports = ResidentHome;

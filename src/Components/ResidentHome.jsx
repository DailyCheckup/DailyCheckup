const React = require('react');
import { Link } from 'react-router';

const ResidentHome = React.createClass({

  checkIfChangedPassword() {
    if (!this.props.getState.changedPW) {
      document.getElementById('warning').style.display = '';
    }
  },

  render() {
    return (
      <div className="residentHome clearfix">
        <Link to='/resident/quiz'> Take the Quiz! </Link>
        <Link to='/resident/results'> Check your Stats </Link>
        <Link to='/resident/changePassword' id="changePW"> Change password </Link>
        <i id="warning" style={{ display: 'none' }}title='You have not yet changed your temporary password' className='material-icons'>warning</i>
      </div>
    );
  },
});

module.exports = ResidentHome;

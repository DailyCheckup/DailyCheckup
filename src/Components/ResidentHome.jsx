const React = require('react');
import { Link } from 'react-router';

const ResidentHome = React.createClass({

  componentDidMount() {
    this.checkIfChangedPassword();
  },

  checkIfChangedPassword() {
    if (!this.props.getState.changedPW) {
      document.getElementById('warning').style.display = 'block';
    }
  },

  render() {

    return (
      <div className="residentHome clearfix">
        <Link to='/resident/quiz'> Take the Quiz! </Link>
        <Link to='/resident/results'> Check your Stats </Link>
        <Link to='/resident/changePassword' id="changePW"> Change password </Link>
        <p id="warning" style={{ display: 'none' }}>
          <i className='material-icons'>warning</i>
           You have not yet changed your temporary password.
        </p>
      </div>
    );
  },
});

module.exports = ResidentHome;

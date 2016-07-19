const React = require('react');
import { Link } from 'react-router';

const ResidentPane = React.createClass({

  getInitialState() {
    return ({
      dailyQuestionData: [],
    });
  },

  setResidentState(stateObj) {
    this.setState(stateObj);
  },

  render() {
    return (
      <div className='residentPane md-width-70 lg-width-30'>
        <p id="userFirstName">Hi {this.props.getState.firstName}!
          <Link className='homeIcon' to='/resident/'>
            <i className='material-icons md-36 md-dark'>
            home
            </i>
          </Link>
        </p>
        {this.props.children && React.cloneElement(this.props.children,
          { setAppState: this.props.setAppState,
            getState: this.props.getState,
            setResidentState: this.setResidentState,
            residentState: this.state })}
      </div>
    );
  },
});

module.exports = ResidentPane;

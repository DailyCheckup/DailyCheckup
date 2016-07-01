const React = require('react');
const ResidentHome = require('./ResidentHome');

const ResidentPane = React.createClass({
  render() {
    return (
      <div>
        <p>Hi Brendan!</p>
        <ResidentHome />
      </div>
      { this.props.children }
    );
  },
});

module.exports = ResidentPane;

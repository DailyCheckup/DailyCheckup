const React = require('react');

const Header = React.createClass({
  render() {
    return (
      <header>
        <h1>Daily Checkup</h1>
        {this.props.children}
      </header>
    );
  },
});

module.exports = Header;

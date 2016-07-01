const React = require('react');

const Header = React.createClass({
  render() {
    return (
      <header>
        <h1>MD Quizzz</h1>
        <p>HOME</p>
        {this.props.children}
      </header>
    );
  },
});

module.exports = Header;

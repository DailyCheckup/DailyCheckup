const React = require('react');

const Header = React.createClass({
  render() {
    return (
      <header>
        <p>This iz the header - MD QUIZZZZ - HOME</p>
        {this.props.children}
      </header>
    );
  },
});

module.exports = Header;

const React = require('react');

const DirectorPane = React.createClass({
  render() {
    return (
      <h1>Director Home Page</h1>
      { this.props.children }
    );
  },
});

module.exports = DirectorPane;

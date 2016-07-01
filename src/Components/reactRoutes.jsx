const React = require('react');
import { Router, Route, Link, indexRoute, browserHistory } from 'react-router';
const Header = require('./header.jsx');
const Login = require('./login.jsx');
const ResidentPane = require('./ResidentPane.jsx');
const ResidentHome = require('./ResidentHome.jsx');
const DirectorPane = require('./DirectorPane.jsx');
const DirectorHome = require('./DirectorHome.jsx');

const Routes = React.createClass({
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Header}>
          <indexRoute component={Login} />
          <Route path='resident' component={ResidentPane}>
            <indexRoute path='home' component={ResidentHome} />
            <Route path='quiz' component={} />
            <Route path='results' component={} />
            <Route path='changePassword' component={} />
          </Route>
          <Route path='director' component={DirectorPane}>
            <indexRoute path='home' component={DirectorHome} />
            <Route path='todaysQuiz' component={} />
            <Route path='results' component={} />
            <Route path='settings' component={} />
          </Route>
        </Route>
      </Router>
    );
  },
});

module.exports = Routes;

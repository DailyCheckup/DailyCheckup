const React = require('react');
import { Router, Route, Link, indexRoute, browserHistory } from 'react-router';
const Header = require('./header.jsx');
const Login = require('./login.jsx');
const ResidentPane = require('./ResidentPane.jsx');
const ResidentHome = require('./ResidentHome.jsx');
const ResidentResults = require('./ResidentResults.jsx');
const ResidentChangePW = require('./ResidentChangePW.jsx');
const DirectorPane = require('./DirectorPane.jsx');
const DirectorHome = require('./DirectorHome.jsx');
const DirectorResults = require('./DirectorResults.jsx');
const DirectorSettings = require('./DirectorSettings.jsx');
const TodaysQuiz = require('./DirectorTodaysQuiz.jsx');
const Quiz = require('./Quiz/Quiz.jsx');

const Routes = React.createClass({
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Header}>
          <indexRoute component={Login} />
          <Route path='resident' component={ResidentPane}>
            <indexRoute path='home' component={ResidentHome} />
            <Route path='quiz' component={Quiz} />
            <Route path='results' component={ResidentResults} />
            <Route path='changePassword' component={ResidentChangePW} />
          </Route>
          <Route path='director' component={DirectorPane}>
            <indexRoute path='home' component={DirectorHome} />
            <Route path='todaysQuiz' component={TodaysQuiz} />
            <Route path='results' component={DirectorResults} />
            <Route path='settings' component={DirectorSettings} />
          </Route>
        </Route>
      </Router>
    );
  },
});

module.exports = Routes;

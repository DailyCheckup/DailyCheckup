const jwtDecode = require('jwt-decode');
const AJAX = require('./AJAX.js');

function loggedIn() {
  console.log('in logged in', localStorage.DailyCheckupToken);
  return !!localStorage.DailyCheckupToken;
}

function hasExpired() {
  const token = jwtDecode(localStorage.DailyCheckupToken);
  return Date.now() > (token.exp * 1000);
}

module.exports = {

  isResident(nextState, replace) {
    if (!loggedIn()) {
      replace({
        pathname: '/',
        state: { nextPathname: nextState.location.pathname },
      });
    }
  },

  isDirector(nextState, replace) {
    if (!loggedIn()) {
      // if you dont have a token, you are not loggged in and will be redirected to login page
      replace({
        pathname: '/',
        state: { nextPathname: nextState.location.pathname },
      });
    } else {
      const token = jwtDecode(localStorage.DailyCheckupToken);
      if (!hasExpired()) {
        // if you arent expired then continue through to correct route
        if (!token.isAdmin) {
          replace({
            pathname: '/',
            state: { nextPathname: nextState.location.pathname },
          });
        }
      } else {
        // if token has expired delete token and send back to login page
        delete localStorage.DailyCheckupToken;
      }
    }
  },
  goHome(nextState, replace) {
    // if you are logged in and have a valid unexpired token then continue to your correct home page
    if (loggedIn() && !hasExpired()) {
      const token = jwtDecode(localStorage.DailyCheckupToken);
      if (token.isAdmin) {
        replace('/director');
      } else {
        replace('/resident');
      }
    } else {
      delete localStorage.DailyCheckupToken;
    }
  },

};

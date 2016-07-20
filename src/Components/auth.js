const jwtDecode = require('jwt-decode');

function loggedIn() {
  return !!localStorage.DailyCheckupToken;
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
      replace({
        pathname: '/',
        state: { nextPathname: nextState.location.pathname },
      });
    } else {
      const token = jwtDecode(localStorage.DailyCheckupToken);
      if (!token.isAdmin) {
        replace({
          pathname: '/',
          state: { nextPathname: nextState.location.pathname },
        });
      }
    }
  },
  goHome(nextState, replace) {
    if (loggedIn()) {
      const token = jwtDecode(localStorage.DailyCheckupToken);
      if (token.isAdmin) {
        replace('/director');
      } else {
        replace('/resident');
      }
    }
  },

};

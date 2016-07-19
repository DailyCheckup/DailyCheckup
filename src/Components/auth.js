

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
    }
  },
};

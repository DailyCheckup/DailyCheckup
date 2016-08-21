import * as types from './actionTypes';

const stateLossActions = {

  noUserState(token) {
    return {
      type: types.NO_USER_STATE,
      userState: token,
    };
  },
};

module.exports = stateLossActions;

import * as types from './actionTypes';

const loginAction = {
  
  loginSuccess(userInfo) {
    return {
      type: types.LOGIN_SUCCESS,
      userInfo,
    };
  },
};

module.exports = loginAction;

import * as types from './actionTypes';

export function loginSuccess(userInfo) {
  return {
    type: types.LOGIN_SUCCESS,
    userInfo,
  };
}

import * as types from './../actions/actionTypes';

const initialState = {
  userEmail: '',
  changedPW: '',
  isAdmin: '',
  dailyQuestions: [],
  takenQuiz: false,
  quizAvailability: false,
  firstName: '',
  loggedIn: false,
};

function userStateReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, action.userInfo);
    case types.NO_USER_STATE:
      return Object.assign({}, state, action.userState);
    default:
      return state;
  }
}

export default userStateReducer;


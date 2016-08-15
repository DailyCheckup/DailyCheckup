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

function loginReducer(state = initialState, action) {
  if (action.type === types.LOGIN_SUCCESS) {
    return Object.assign({}, state, action.userInfo);
  }
  return state;
}

export default loginReducer;


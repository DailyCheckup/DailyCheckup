// moved login reducer here for now because kept getting error that 'reducers is not a function'
import { createStore } from 'redux';
import reducers from './Reducers/index';
// import { loginReducer } from './Reducers/loginReducer';

// import * as types from './actions/actionTypes';

// const initialState = {
//   userEmail: '',
//   changedPW: '',
//   isAdmin: '',
//   dailyQuestions: [],
//   takenQuiz: false,
//   quizAvailability: false,
//   firstName: '',
//   loggedIn: false,
// };

// function loginReducer(state = initialState, action) {
//   if (action.type === types.LOGIN_SUCCESS) {
//     return Object.assign({}, state, action.userInfo);
//   }
//   return state;
// }

const store = createStore(reducers);
// const store = createStore(loginReducer);
export default store;


import { combineReducers } from 'redux';

// Reducers
import loginReducer from './loginReducer';

// Combine Reducers

const reducers = combineReducers({
  userState: loginReducer,
});

module.exports = reducers;

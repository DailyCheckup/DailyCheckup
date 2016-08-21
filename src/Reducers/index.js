import { combineReducers } from 'redux';

// Reducers
import userStateReducer from './userStateReducer';
// import retrieveStateReducer from './retrieveStateReducer';

// Combine Reducers
const reducers = combineReducers({
  userState: userStateReducer,
});

module.exports = reducers;

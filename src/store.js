import { createStore } from 'redux';
import reducers from './Reducers/quizReducer';

const store = createStore(reducers);
module.exports = store;

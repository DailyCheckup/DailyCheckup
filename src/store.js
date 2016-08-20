import { createStore } from 'redux';
import reducers from './Reducers/index';

const store = createStore(reducers);
export default store;

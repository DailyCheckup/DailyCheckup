import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// const store = require('./../store.js');
const Routes = require('./reactRoutes.jsx');
require('../Styles/styles.scss');

// Uncomment when reducers are up and running
// ReactDOM.render(<Provider store={store}> <Routes /> </Provider>, document.getElementById('content'));

ReactDOM.render(<Routes />, document.getElementById('content'));

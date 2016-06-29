'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config');
//require middleware which checks database to see if user was inputted
//var checkUser = require('./src/middleware.js')

// Constants
const PORT = 3000;

// App
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', function (req, res) {
//expecting email and password in req.body
//will run this through middleware once db is setup
  res.send({'email':'test@email.com','password':'admin'});
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);

///////

app.use(express.static(path.join(__dirname, './../')));

app.get('/app.js', (req, res) => {
  if (process.env.PRODUCTION) {
    res.sendFile(__dirname + '/build/build.js');
  } else {
    res.redirect('//localhost:9090/build/build.js');
  }
});

// Serve aggregate stylesheet depending on environment
// NEED TO UPDATE WHEN WE HAVE STYLES
app.get('/style.css', (req, res) => {
  if (process.env.PRODUCTION) {
    res.sendFile(__dirname + '/client/style.css');
  } else {
    res.redirect('//localhost:9090/client/style.css');
  }
});

// Serve index page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/', 'main.html'));
  // res.sendFile(__dirname + '/index.html');
});

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: true,
  historyApiFallback: true,
}).listen(9090, 'localhost', (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log('webpack i think');
});

module.exports = app;


'use strict';
var express = require('express');
var app = express();
var users = ['John', 'Betty', 'Hal'];

app.get('/users', function (req, res) {
  res.json(users);
});


var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Server running on port %d', port);
});
module.exports = app;

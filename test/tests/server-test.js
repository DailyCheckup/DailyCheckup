'use strict'
var test = require('tape');
var request = require('supertest');
var app = require('./../../server/server.js');

test('Correct User Login', function (t) {
  var userInput = { emailAddress: 'demo', password: 'testing' };
  t.plan(1);
  request(app)
    .post('/login')
    .send(userInput)
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function (err, res) {
      t.same(res.status, 200, 'correct status code was sent');
      t.end();
      app.destroy();
    });
  });

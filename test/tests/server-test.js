'use strict'
var test = require('tape');
var request = require('supertest');
var app = require('./../../server/server.js');

test('Correct status code BLAH', function (t) {
  var userInput = { emailAddress: 'bignoob', password: 'testing' };
  t.plan(1);
  request(app)
    .post('/login')
    .send(userInput)
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function (err, res) {
      console.log(res.body, 'this is request app stuff');
      t.same(res.status, 200, 'correct status code was sent');
      // t.same(res.body, {'email':'test@email.com','password':'admin'}, 'the correct body was posted to /login');
      t.end();
      app.destroy();
    });
  });

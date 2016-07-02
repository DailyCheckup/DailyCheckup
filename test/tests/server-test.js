'use strict'
var test = require('tape');
var request = require('supertest');
var app = require('./../../server/server.js');

test('Correct status code', function (assert) {
  request(app)
    .post('/login')
    .expect(200)
    .end(function (err, res) {
      assert.same(res.status, 200, 'correct status code was sent');
      assert.same(res.body, {'email':'test@email.com','password':'admin'}, 'the correct body was posted to /login');
      assert.end();
    });
  });

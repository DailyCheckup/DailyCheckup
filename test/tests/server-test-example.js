'use strict'
var test = require('tape');
var request = require('supertest');
//replace app file path with server path to test server
var app = require('./../fixtures/server-fixture.js');

//this is testing if the status code has been
//sent correctly to the route '/users'
test('Correct status code', function (assert) {
  request(app)
    .get('/users')
    .expect(200)
    .end(function (err, res) {
      assert.same(res.status, 404, 'correct status code was sent');
      assert.end();
    });
  });


test('Correct users returned', function (assert) {
  request(app)
    .get('/users')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      var expectedUsers = ['John', 'Betty', 'Hal'];
      //error with catch any of the expects or the get if they fail
      assert.error(err, 'No error');
      assert.same(res.body, expectedUsers, 'Users as expected');
      assert.end();
    });
});

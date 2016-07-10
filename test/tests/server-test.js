'use strict'
const test = require('tape');
const request = require('supertest');
const app = require('./../../server/server.js');

test('Successful Login with Correct Info Returned', (t) => {
  t.plan(6);
  request(app)
    .post('/login')
    .send({
      emailAddress: 'demo',
      password: 'testing',
    })
    .expect(200)
    .end((err, res) => {
      // console.log(res.results);
      const results = JSON.parse(res.text);
      t.same(results.email, 'demo', 'correct email from db');
      t.same(results.changedPassword, true, 'changed password');
      t.same(results.isAdmin, false, 'should not be admin');
      t.same(results.firstName, 'Brendan', 'correct first name');
      t.same(results.dailyQuestions.length, 5, 'correct amount of questions')
      t.same(res.status, 200, 'correct status code was sent');
      t.end();
      app.destroy();
    });
});

// test('Changed Password Was Successful', (t) => {
//   t.plan(1);
//   request(app)
//     .post('/changePassword')
//     .send({
//       emailAddress: 'demo',
//       password: 'testing',
//     })
//     .expect(200)
//     .expect('Content-Type', /json/)
//     .end((err, res) => {
//       console.log(res, 'this is response');
//       t.same(res.status, 200, 'correct status code')
//       t.end();
//       app.destroy();
//     });
// });

//this is testing if the status code has been
//sent correctly to the route '/users'
// test('Correct status code', function (assert, done) {
//   assert.plan(1);
//   request(app2)
//     .get('/users')
//     .expect(200)
//     .end(function (err, res) {
//       assert.same(res.status, 200, 'correct status code was sent');
//       assert.end();
//     });
// });
//
//
// test('Correct users returned', function (assert) {
//   assert.plan(2);
//   request(app2)
//     .get('/users')
//     .expect('Content-Type', /json/)
//     .expect(200)
//     .end(function (err, res) {
//       var expectedUsers = ['John', 'Betty', 'Hal'];
//       //error with catch any of the expects or the get if they fail
//       assert.error(err, 'No error');
//       assert.same(res.body, expectedUsers, 'Users as expected');
//       assert.end();
//       app2.destroy();
//     });
// });

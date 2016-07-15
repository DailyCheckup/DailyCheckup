'use strict'
const test = require('tape');
const request = require('supertest');
const app = require('./../../server/server.js');
const Sequelize = require('./../fixtures/DB-fixture.js').DB;
const UserTests = require('./../fixtures/DB-fixture.js').UserTests;
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
      const results = JSON.parse(res.text);
      t.same(results.email, 'demo', 'correct email from db');
      t.same(results.changedPassword, true, 'changed password');
      t.same(results.isAdmin, false, 'should not be admin');
      t.same(results.firstName, 'Brendan', 'correct first name');
      t.same(results.dailyQuestions.length, 5, 'correct amount of questions');
      t.same(res.status, 200, 'correct status code was sent');
      t.end();
      // app.destroy();
    });
});
//
test('Changed Password Was Successful', (t) => {
  t.plan(2);
  request(app)
    .post('/changePassword')
    .send({
      emailAddress: 'Brendan',
      password: 'newPW',
    })
    .expect(200)
    // .expect('Content-Type', /json/)
    .end((err, res) => {
      t.same(res.status, 200, 'correct status code');
      t.same(res.req.res.text, '"Succesfully updated password"', 'correctly changed pw');
      t.end();
      app.destroy();
    });
});
// {
//   data: results,
// }
// test('User Response was sent succesfully', (t) => {
// var results = 0;
//   t.plan(2);
//   request(app)
//     .post('/userResponse')
//     .send({
//       data: results,
//     })
//     .expect(200)
//     // .expect('Content-Type', /json/)
//     .end((err, res) => {
//       t.same(res.status, 200, 'correct status code');
//       t.same(res.req.res.text, '"Succesfully updated password"', 'correctly changed pw');
//       t.end();
//       app.destroy();
//     });
// });

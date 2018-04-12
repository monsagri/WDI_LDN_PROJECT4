/* global api, describe, it, expect, beforeEach */

const User = require('../../../models/User');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const transactionData = {
  date: '2018-04-12',
  amount: -400,
  category: 'testing',
  description: 'test'
};

const userData = { username: 'test', email: 'test@test.com', password: 'test', passwordConfirmation: 'test' };
let token;
let userId;

describe('POST /transactions', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
        userId = user._id;
      })
      .then(() =>   api
        .post(`/api/users/${userId}/transactions`)
        .set('Authorization', `Bearer ${token}`)
        .send(transactionData))
      .then(done);
  });

  it('should return a 401 response', done => {
    api
      .delete(`/api/users/${userId}/transactions`)
      .send(transactionData)
      .expect(401, done);
  });

});

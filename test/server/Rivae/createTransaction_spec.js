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
      .then(done);
  });

  it('should return a 401 response', done => {
    api
      .post(`/api/users/${userId}/transactions`)
      .send(transactionData)
      .expect(401, done);
  });

  it('should return a 201 response with a token', done => {
    api
      .post(`/api/users/${userId}/transactions`)
      .set('Authorization', `Bearer ${token}`)
      .send(transactionData)
      .expect(201, done);
  });

  it('should return the created transaction', done => {
    api
      .post(`/api/users/${userId}/transactions`)
      .set('Authorization', `Bearer ${token}`)
      .send(transactionData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        // this request returns all transactions sorted by year/month. need to find the transaction in there - will do it in the next test.
        expect(Object.keys(res.body).length).to.not.eq(0);
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .post(`/api/users/${userId}/transactions`)
      .set('Authorization', `Bearer ${token}`)
      .send(transactionData)
      .end((err, res) => {
        // need to find the transaction in the nesting
        expect(res.body[2018][3]);
        expect(res.body[2018][3].find(transaction =>
          transaction.category === transactionData.category)).to.include.keys([
          '_id',
          'date',
          'amount',
          'category',
          'description'
        ]);
        done();
      });
  });
});

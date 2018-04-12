/* global api, describe, it, expect, beforeEach */

const User = require('../../../models/User');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const transactionData = {
  date: new Date(),
  amount: -400,
  category: 'testing',
  description: 'test'
};

const userData = { username: 'test', email: 'test@test.com', password: 'test', passwordConfirmation: 'test' };
let token;

describe('POST /transactions', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      })
      .then(done);
  });

  it('should return a 401 response', done => {
    api
      .post(`/api/users/${token.sub}/transactions`)
      .send(transactionData)
      .expect(401, done);
  });

  it('should return a 201 response with a token', done => {
    api
      .post(`/api/users/${token.sub}/transactions`)
      .set('Authorization', `Bearer ${token}`)
      .send(transactionData)
      .expect(201, done);
  });

  it('should return the created transaction', done => {
    api
      .post(`/api/users/${token.sub}/transactions`)
      .set('Authorization', `Bearer ${token}`)
      .send(transactionData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.keys([
          '_id',
          'date',
          'amount',
          'category',
          'description'
        ]);
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .post(`/api/users/${token.sub}/transactions`)
      .set('Authorization', `Bearer ${token}`)
      .send(transactionData)
      .end((err, res) => {
        expect(res.body.date).to.eq(transactionData.date);
        expect(res.body.amount).to.eq(transactionData.amount);
        expect(res.body.category).to.deep.eq(transactionData.category);
        expect(res.body.description).to.eq(transactionData.description);
        done();
      });
  });
});

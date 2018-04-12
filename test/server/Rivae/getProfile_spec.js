/* global api, describe, it, expect, beforeEach */

const User = require('../../../models/User');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const userData = { username: 'test', email: 'test@test.com', password: 'test', passwordConfirmation: 'test' };
let token;
let userId;

describe('get /users/:id', () => {
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

      .get(`/api/users/${userId}`)
      .expect(401, done);
  });

  it('should return a user with a token', done => {
    api
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.keys([
          '_id',
          'username',
          'email',
          'created',
          'transactions'
        ]);
        done();
      });

  });
});
